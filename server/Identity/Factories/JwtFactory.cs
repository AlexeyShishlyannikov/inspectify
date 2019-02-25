﻿using Logistics.BusinessLayer;
using Logistics.Identity.Models;
using Logistics.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Logistics.Identity
{
    public class JwtFactory : IJwtFactory
    {
        private readonly JwtIssuerOptions jwtOptions;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ICompaniesProvider companyProvider;
        private readonly ITeamProvider teamProvider;

        public JwtFactory(
            IOptions<JwtIssuerOptions> jwtOptions,
            UserManager<ApplicationUser> userManager,
            ICompaniesProvider companyProvider,
            ITeamProvider teamProvider)
        {
            this.jwtOptions = jwtOptions.Value;
            this.userManager = userManager;
            this.companyProvider = companyProvider;
            this.teamProvider = teamProvider;
        }

        public async Task<string> GenerateEncodedToken(ApplicationUser user)
        {
            var userClaims = await userManager.GetClaimsAsync(user);
            var isUserVerified = await userManager.IsEmailConfirmedAsync(user) ? "true" : "false";
            var company = await companyProvider.GetCompanyByPersonId(user.Id);
            var companyId = company != null ? company.Id : "";
            var team = await teamProvider.GetTeamByPerson(user.Id);
            var teamId = team != null ? team.Id : "";
            var isCompany = company.ApplicationUserId == user.Id ? "true" : "false";
            var customClaims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Jti, await jwtOptions.JtiGenerator()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("isEmailVerified", isUserVerified),
                new Claim("companyId", companyId),
                new Claim("teamId", teamId),
                new Claim("isCompany", isCompany)
            };

            // Create the JWT security token and encode it.
            var jwt = new JwtSecurityToken(
                issuer: jwtOptions.Issuer,
                audience: jwtOptions.Audience,
                claims: customClaims.Union(userClaims),
                notBefore: jwtOptions.NotBefore,
                expires: jwtOptions.Expiration,
                signingCredentials: jwtOptions.SigningCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return encodedJwt;
        }
    }
}
