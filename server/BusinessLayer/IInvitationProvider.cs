using server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.BusinessLayer
{
    public interface IInvitationProvider
    {
        Task<Invitation> AddInvitation(Invitation invitation);
        Task<Invitation> GetInvitation(string id);
        Task<bool> CheckIfEmailIsInvited(string email);
        Task<Invitation> UpdateInvitation(Invitation invitation);
        Task<bool> DeleteInvitation(string id);
        Task<List<Invitation>> GetInvitations(string companyId);
    }
}
