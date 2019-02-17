using System;
using System.Threading.Tasks;
using Logistics.BusinessLayer;
using Logistics.Identity;
using Logistics.Models.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Logistics.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly IAccountProvider accountProvider;
        private readonly IJwtFactory jwtFactory;

        public AccountController(IAccountProvider accountProvider, IJwtFactory jwtFactory)
        {
            this.accountProvider = accountProvider;
            this.jwtFactory = jwtFactory;
        }

        [HttpPost]
        [Route("register/user")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var result = await accountProvider.RegisterUser(model);
                    if (result.Succeeded) return Ok();
                }
                catch (Exception err)
                {
                    return BadRequest(err);
                }
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("register/company")]
        public async Task<IActionResult> RegisterCompany([FromBody] RegisterCompanyModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var result = await accountProvider.RegisterCompany(model);
                    if (result.Succeeded) return Ok();
                }
                catch (Exception err)
                {
                    return BadRequest(err);
                }
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await accountProvider.LoginUser(model);
                return Ok(await jwtFactory.GenerateEncodedToken(user));
            }

            ModelState.AddModelError("", "Invalid Model State Or Password");
            return BadRequest();
        }

        [HttpGet]
        [Route("confirm")]
        public async Task<IActionResult> ConfirmEmailAddress([FromQuery] string token, [FromQuery] string email)
        {
            var result = await accountProvider.ConfirmEmailAddress(token, email);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("forgot")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            if (!ModelState.IsValid) return BadRequest();

            await accountProvider.ForgotPassword(model);
            return Ok();
        }

        [HttpPost]
        [Route("change")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            if (!ModelState.IsValid) return BadRequest();

            await accountProvider.ChangePassword(model);
            return Ok();
        }

        [HttpPost]
        [Route("reset")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await accountProvider.ResetPassword(model);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}