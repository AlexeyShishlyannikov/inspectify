using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Logistics.BusinessLayer;
using Logistics.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Logistics.Controllers
{
    [Route("api/companies")]
    public class CompaniesController : Controller
    {
        private readonly ICompaniesProvider companiesProvider;
        private readonly UserManager<ApplicationUser> userManager;

        public CompaniesController(ICompaniesProvider companiesProvider, UserManager<ApplicationUser> userManager)
        {
            this.companiesProvider = companiesProvider;
            this.userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetCompany()
        {
            ClaimsPrincipal currentUser = this.User;
            var currentUserName = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            ApplicationUser user = await userManager.FindByNameAsync(currentUserName);
            var companyClaim = currentUser.Claims.FirstOrDefault(claim => claim.Type == "company");
            if (companyClaim == null)
            {
                return BadRequest();
            }
            var companyName = companyClaim.Value;
            var company = await companiesProvider.GetCompany(companyName);
            if (company != null)
            {
                return Ok(company);
            }
            return NotFound();
        }
    }
}
