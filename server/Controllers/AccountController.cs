using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using server.BusinessLayer;
using server.DAL;
using server.Identity;
using server.Models;
using server.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.ViewModels;

namespace server.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly IJwtFactory jwtFactory;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IEmailProvider emailProvider;
        private readonly IUsersProvider usersProvider;
        private readonly IInvitationProvider invitationProvider;
        private readonly ICompaniesProvider companiesProvider;

        public AccountController(
            IJwtFactory jwtFactory,
            ICompaniesProvider companiesProvider,
            UserManager<ApplicationUser> userManager,
            IEmailProvider emailProvider,
            IUsersProvider usersProvider,
            IInvitationProvider invitationProvider)
        {
            this.jwtFactory = jwtFactory;
            this.companiesProvider = companiesProvider;
            this.userManager = userManager;
            this.emailProvider = emailProvider;
            this.usersProvider = usersProvider;
            this.invitationProvider = invitationProvider;
        }

        [HttpPost]
        [Route("register/user")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserModel model)
        {
            if (await userManager.FindByEmailAsync(model.Email) != null)
            {
                return BadRequest("User already exists");
            }
            var invitation = await invitationProvider.GetInvitation(model.InvitationId);
            if (invitation == null)
            {
                return BadRequest("Invitation not found");
            }
            var identityResult = await userManager.CreateAsync(new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email
            }, model.Password);
            if (!identityResult.Succeeded) return BadRequest("Something went wrong!");
            var user = await userManager.FindByEmailAsync(model.Email);
            await usersProvider.AddPerson(new Person
            {
                Id = user.Id,
                ApplicationUserId = user.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                CompanyId = invitation.CompanyId
            });
            await invitationProvider.DeleteInvitation(model.InvitationId);
            // var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            // await emailProvider.SendConfirmEmail(user, token);
            return Ok(await jwtFactory.GenerateEncodedToken(user));
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
                await companiesProvider.AddCompany(new Company
                {
                    Name = model.CompanyName,
                    ApplicationUserId = user.Id
                });
                var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                await emailProvider.SendConfirmEmail(user, token);
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
                return NotFound("User not found");
            }
            if (await userManager.IsLockedOutAsync(user))
            {
                // add email logic to notify user
                return BadRequest("User has been locked out for 10 minutes");
            }
            else if (!await userManager.CheckPasswordAsync(user, model.Password))
            {
                await userManager.AccessFailedAsync(user);
                return BadRequest("Incorrect password");
            }
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
            return Ok("Email not sent, not implemented");
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
    }
}