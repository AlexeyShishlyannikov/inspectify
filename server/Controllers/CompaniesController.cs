using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Logistics.BusinessLayer;
using Logistics.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.ViewModels;

namespace Logistics.Controllers
{
    [Route("api/companies")]
    public class CompaniesController : Controller
    {
        private readonly ICompaniesProvider companiesProvider;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IMapper mapper;

        public CompaniesController(
            ICompaniesProvider companiesProvider, 
            UserManager<ApplicationUser> userManager, 
            IMapper mapper)
        {
            this.companiesProvider = companiesProvider;
            this.userManager = userManager;
            this.mapper = mapper;
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
                var companyViewModel = mapper.Map<Company, CompanyViewModel>(company);
                return Ok(companyViewModel);
            }
            return NotFound();
        }
    }
}
