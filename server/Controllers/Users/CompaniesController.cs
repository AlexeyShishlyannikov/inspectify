using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Inspectify.BusinessLayer;
using Inspectify.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Inspectify.ViewModels;

namespace Inspectify.Controllers
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
        [Authorize]
        public async Task<IActionResult> GetCompany()
        {
            var companyId = GetCompanyClaim();
            if (companyId == null) return BadRequest("No claim");
            var company = await companiesProvider.GetCompany(companyId);
            if (company != null)
            {
                var companyViewModel = mapper.Map<Company, CompanyViewModel>(company);
                return Ok(companyViewModel);
            }
            return NotFound("Company not found");
        }

        [HttpPost]
        [Route("update")]
        [Authorize]
        public async Task<IActionResult> UpdateCompany([FromBody] CompanyViewModel companyViewModel)
        {
            var companyId = GetCompanyClaim();
            if (companyId == null) return BadRequest("No claim");
            var company = await companiesProvider.GetCompany(companyId);
            if (company == null) return NotFound("Company not found");
            mapper.Map<CompanyViewModel, Company>(companyViewModel, company);
            await companiesProvider.UpdateCompany(company);
            var returnViewModel = mapper.Map<Company, CompanyViewModel>(company);
            return Ok(returnViewModel);
        }

        private string GetCompanyClaim() =>
            this.User.Claims.FirstOrDefault(claim => claim.Type == "companyId")?.Value;
    }
}
