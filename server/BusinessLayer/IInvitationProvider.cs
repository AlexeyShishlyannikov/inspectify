using Logistics.Models;
using server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Logistics.BusinessLayer
{
    public interface IInvitationProvider
    {
        Task<Invitation> AddInvitation(Invitation invitation);
        Task<Invitation> GetInvitation(string id);
        Task<bool> CheckIfEmailIsInvited(string email);
        Task<bool> CheckIfPhoneIsInvited(string phoneNumber);
        Task<Invitation> UpdateInvitation(Invitation invitation);
        Task<bool> DeleteInvitation(string id);
        Task<List<Invitation>> GetInvitations(string companyId);
    }
}
