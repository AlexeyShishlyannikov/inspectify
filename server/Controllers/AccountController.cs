using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Logistics.BusinessLayer;
using Logistics.DAL;
using Logistics.Identity;
using Logistics.Models;
using Logistics.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.ViewModels;

namespace Logistics.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly IJwtFactory jwtFactory;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly LogisticsDbContext dbContext;
        private readonly ICompaniesProvider companiesProvider;

        public AccountController(
            IJwtFactory jwtFactory,
            LogisticsDbContext dbContext,
            ICompaniesProvider companiesProvider,
            UserManager<ApplicationUser> userManager)
        {
            this.jwtFactory = jwtFactory;
            this.dbContext = dbContext;
            this.companiesProvider = companiesProvider;
            this.userManager = userManager;
        }

        [HttpPost]
        [Route("register/user")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserModel model)
        {
            if (await userManager.FindByEmailAsync(model.Email) != null)
            {
                return BadRequest("User already exists");
            }
            var identityResult = await userManager.CreateAsync(new ApplicationUser { UserName = model.Email, Email = model.Email }, model.Password);
            if (identityResult.Succeeded)
            {
                var user = await userManager.FindByEmailAsync(model.Email);
                await dbContext.Persons.AddAsync(new Person { ApplicationUserId = user.Id, CompanyId = model.CompanyId });
                await dbContext.SaveChangesAsync();
                // var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                // var link = "http://localhost:4199/confirmation";
                // var confirmationLink = $"{link}{ new { token, email = user.Email }}";
                // await SendConfirationEmail(user, confirmationLink);
                return Ok(await jwtFactory.GenerateEncodedToken(user));
            }
            return BadRequest("Something went wrong!");
        }


        [HttpPost]
        [Route("register/company")]
        public async Task<IActionResult> RegisterCompany([FromBody] RegisterCompanyModel model)
        {
            if (await userManager.FindByEmailAsync(model.Email) != null)
            {
                return BadRequest("Company already exists!");
            }
            var identityResult = await userManager.CreateAsync(new ApplicationUser { UserName = model.Email, Email = model.Email }, model.Password);
            if (identityResult.Succeeded)
            {
                var user = await userManager.FindByEmailAsync(model.Email);
                await companiesProvider.AddCompany(new Company()
                {
                    Name = model.CompanyName,
                    ApplicationUserId = user.Id
                });
                // var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                // var link = "http://localhost:4199/confirmation";
                // var confirmationLink = $"{link}{ new { token, email = user.Email }}";
                // await SendConfirationEmail(user, confirmationLink);
                return Ok(await jwtFactory.GenerateEncodedToken(user));
            }
            return BadRequest("Something went wrong!");
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                if (await userManager.IsLockedOutAsync(user))
                {
                    // add email logic to notify user
                    return BadRequest("User has been locked out for 10 minutes");
                }
            }
            else if (!await userManager.CheckPasswordAsync(user, model.Password))
            {
                await userManager.AccessFailedAsync(user);
                return BadRequest("Incorrect password");
            }
            // else if (!await userManager.IsEmailConfirmedAsync(user))
            // {
            //     return BadRequest("Email is not yet confirmed");
            // }
            await userManager.ResetAccessFailedCountAsync(user);
            return Ok(await jwtFactory.GenerateEncodedToken(user));
        }

        [HttpGet]
        [Route("confirm")]
        public async Task<IActionResult> ConfirmEmailAddress([FromQuery] string token, [FromQuery] string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var identityResult = await userManager.ConfirmEmailAsync(user, token);
                if (identityResult.Succeeded)
                {
                    return Ok("Email confirmed");
                }
                return BadRequest("Wrong token");
            }
            return NotFound("User not found");
        }

        [HttpPost]
        [Route("forgot")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest("User was not found");
            }
            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var resetUrl = $"localhost:4199/resetpassword{new { token = token, email = user.Email }}";
            // send email
            return Ok("Email not sent");
        }

        [HttpPost]
        [Route("change")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest("User was not found");
            }
            var identityResult = await userManager.ChangePasswordAsync(user, model.OldPassword, model.Password);
            if (!identityResult.Succeeded)
            {
                return BadRequest("Failed password change");
            }
            return Ok("Password changed");
        }

        [HttpPost]
        [Route("reset")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null) return BadRequest("User was not found");

            var result = await userManager.ResetPasswordAsync(user, model.ResetToken, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest("Something went wrong!");
            }
            if (await userManager.IsLockedOutAsync(user))
            {
                await userManager.SetLockoutEndDateAsync(user, DateTimeOffset.UtcNow);
            }
            return Ok("Password was reset succesfully");
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
    }
}