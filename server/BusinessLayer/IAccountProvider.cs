using Logistics.Models;
using Logistics.Models.Identity;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Logistics.BusinessLayer
{
    public interface IAccountProvider
    {
        Task<IdentityResult> RegisterUser(RegisterUserModel model);
        Task<IdentityResult> RegisterCompany(RegisterCompanyModel model);
        Task<IdentityResult> ConfirmEmailAddress(string token, string email);
        Task<ApplicationUser> LoginUser(LoginModel model);
        Task<ApplicationUser> LoginCompany(LoginModel model);
        Task ForgotPassword(ForgotPasswordModel model);
        Task<IdentityResult> ChangePassword(ChangePasswordModel model);
        Task<IdentityResult> ResetPassword(ResetPasswordModel model);
    }
}
