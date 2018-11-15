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

        public JwtFactory(
            IOptions<JwtIssuerOptions> jwtOptions,
            UserManager<ApplicationUser> userManager)
        {
            this.jwtOptions = jwtOptions.Value;
            this.userManager = userManager;
        }

        public async Task<string> GenerateEncodedToken(ApplicationUser user)
        {
            var userClaims = await userManager.GetClaimsAsync(user);
            var claims = new[]
            {
                 new Claim(JwtRegisteredClaimNames.Sub, user.UserName), // username claim
                 new Claim(JwtRegisteredClaimNames.Jti, await jwtOptions.JtiGenerator()), // unique token signature
                 new Claim(JwtRegisteredClaimNames.Email, user.Email) // email
            }.Union(userClaims);

            // Create the JWT security token and encode it.
            var jwt = new JwtSecurityToken(
                issuer: jwtOptions.Issuer,
                audience: jwtOptions.Audience,
                claims: claims,
                notBefore: jwtOptions.NotBefore,
                expires: jwtOptions.Expiration,
                signingCredentials: jwtOptions.SigningCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return encodedJwt;
        }
    }
}
