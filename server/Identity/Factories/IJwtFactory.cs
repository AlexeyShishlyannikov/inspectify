using Logistics.Models;
using System.Threading.Tasks;

namespace Logistics.Identity
{
    public interface IJwtFactory
    {
        Task<string> GenerateEncodedToken(ApplicationUser user);
    }
}
