using System.Threading.Tasks;
using Logistics.Models;
using server.Models;

namespace server.BusinessLayer
{
    public interface IEmailProvider
    {
        Task<bool> SendEmail(string email, string subject, string body);
        Task<bool> SendWelcomeEmail();
        Task<bool> SendConfirmEmail(ApplicationUser user, string token);
        Task<bool> SendInvitationEmail(Invitation invitation);
        Task<bool> SendForgotPasswordEmail();
    }
}