using System.ComponentModel.DataAnnotations;

namespace server.Models.Identity
{
    public class RegisterModel
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [Compare("Password")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
    }

    public class RegisterUserModel : RegisterModel
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string InvitationId { get; set; }
    }

    public class RegisterCompanyModel : RegisterModel
    {
        [Required]
        public string CompanyName { get; set; }
    }

    public class LoginModel
    {
        public string Email { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }

    public class ForgotPasswordModel
    {
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }

    public class ResetPasswordModel
    {
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Compare("Password")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
        public string ResetToken { get; set; }
    }

    public class ChangePasswordModel
    {
        public string Email { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Compare("Password")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
        [DataType(DataType.Password)]
        public string OldPassword { get; set; }
    }
}
