using server.Models;
using System.Threading.Tasks;

namespace server.Identity
{
    public interface IJwtFactory
    {
        Task<string> GenerateEncodedToken(ApplicationUser user);
    }
}
