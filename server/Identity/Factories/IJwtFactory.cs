using Inspectify.Models;
using System.Threading.Tasks;

namespace Inspectify.Identity
{
    public interface IJwtFactory
    {
        Task<string> GenerateEncodedToken(ApplicationUser user);
    }
}
