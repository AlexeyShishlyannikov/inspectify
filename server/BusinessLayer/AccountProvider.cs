using Logistics.DAL;
using Logistics.Models;
using Logistics.Models.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Logistics.BusinessLayer
{
    public class AccountProvider : IAccountProvider
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly LogisticsDbContext dbContext;
        private readonly ICompaniesProvider companiesProvider;

        public AccountProvider(UserManager<ApplicationUser> userManager,
            LogisticsDbContext dbContext,
            ICompaniesProvider companiesProvider)
        {
            this.userManager = userManager;
            this.dbContext = dbContext;
            this.companiesProvider = companiesProvider;
        }

        public async Task<IdentityResult> RegisterUser(RegisterUserModel model)
        {
            var identityResult = await RegisterIdentity(model);
            if (identityResult.Succeeded)
            {
                var user = await userManager.FindByNameAsync(model.UserName);
                await dbContext.Persons.AddAsync(new Person { ApplicationUserId = user.Id, FirstName = model.FirstName, LastName = model.LastName });
                await dbContext.SaveChangesAsync();
                return identityResult;
            }
            throw new Exception("User already exists");
        }

        public async Task<IdentityResult> RegisterCompany(RegisterCompanyModel model)
        {
            var identityResult = await RegisterIdentity(model);
            if (identityResult.Succeeded)
            {
                var user = await userManager.FindByEmailAsync(model.Email);
                await userManager.AddClaimAsync(user, new Claim("company", model.CompanyName));
                await companiesProvider.AddCompany(new Company() { Name = model.CompanyName });
            }
            return identityResult;
        }

        private async Task<IdentityResult> RegisterIdentity(RegisterModel model)
        {
            var user = await userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                user = new ApplicationUser
                {
                    Id = Guid.NewGuid().ToString(),
                    UserName = model.UserName,
                    Email = model.Email
                };

                var result = await userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                    var link = "http://localhost:4199/confirmation";
                    var confirmationLink = $"{link}{ new { token, email = user.Email }}";
                    await SendConfirationEmail(user, confirmationLink);
                }
                return result;
            }
            throw new Exception("User already exists");
        }

        private async Task SendConfirationEmail(ApplicationUser user, string confirmationLink)
        {
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
            string fromEmail = "shishlyannikov.dev@gmail.com";

            client.EnableSsl = true;
            MailAddress from = new MailAddress(fromEmail, $"Application name");
            MailAddress to = new MailAddress(user.Email, $"{user.UserName}");
            MailMessage message = new MailMessage(from, to);
            message.Body = $"Go to confirmation link - {confirmationLink}";
            message.Subject = $"Email Confirmation - {user.UserName}";
            NetworkCredential myCreds = new NetworkCredential(fromEmail, "", "");
            client.Credentials = myCreds;
            try
            {
                await client.SendMailAsync(message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IdentityResult> ConfirmEmailAddress(string token, string email)
        {
            var user = await userManager.FindByEmailAsync(email);

            if (user != null)
            {
                return await userManager.ConfirmEmailAsync(user, token);
            }

            return IdentityResult.Failed();
        }

        public async Task<ApplicationUser> LoginUser(LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.UserName);
            if (user != null && !await userManager.IsLockedOutAsync(user))
            {
                if (await userManager.CheckPasswordAsync(user, model.Password))
                {
                    if (!await userManager.IsEmailConfirmedAsync(user))
                    {
                        throw new Exception("Email is not yet confirmed");
                    }
                    await userManager.ResetAccessFailedCountAsync(user);
                    return user;
                }
                await userManager.AccessFailedAsync(user);
                // To send lockout response and send email to user about breaching
                if (await userManager.IsLockedOutAsync(user))
                {
                    throw new Exception("You have been lockedout for 10 minutes");
                }
            }
            throw new Exception("Invalid Model State Or Password");
        }

        public async Task<ApplicationUser> LoginCompany(LoginModel model)
        {
            var user = await LoginUser(model);
            var claims = await userManager.GetClaimsAsync(user);
            var companyClaim = claims.FirstOrDefault(claim => claim.Type == "company");
            if (companyClaim != null) return user;
            return null;
        }

        public async Task ForgotPassword(ForgotPasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user != null)
            {
                var token = await userManager.GeneratePasswordResetTokenAsync(user);
                var resetUrl = $"localhost:4199/resetpassword{new { token = token, email = user.Email }}";
                // send email
            }
            else
            {
                // email not found
                throw new Exception("User was not found");
            }
        }

        public async Task<IdentityResult> ChangePassword(ChangePasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.UserName);

            if (user != null)
            {
                return await userManager.ChangePasswordAsync(user, model.OldPassword, model.Password);
            }
            return IdentityResult.Failed(new IdentityError { Description = "User was not found" });
        }

        public async Task<IdentityResult> ResetPassword(ResetPasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user != null)
            {
                var result = await userManager.ResetPasswordAsync(user, model.ResetToken, model.Password);

                if (!result.Succeeded)
                {
                    return result;
                }
                // If lockedout reset the time
                if (await userManager.IsLockedOutAsync(user))
                {
                    await userManager.SetLockoutEndDateAsync(user, DateTimeOffset.UtcNow);
                }
                return result;
            }
            // email not found
            return IdentityResult.Failed(new IdentityError { Description = "User was not found" });
        }
    }
}
