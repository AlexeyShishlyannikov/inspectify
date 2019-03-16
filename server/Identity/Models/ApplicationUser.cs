using Microsoft.AspNetCore.Identity;

namespace Inspectify.Models
{
    public class ApplicationUser: IdentityUser
    {
        public string RefreshToken { get; set; }
    }
}
