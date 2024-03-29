using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Inspectify.DAL;
using Inspectify.Models;
using Microsoft.EntityFrameworkCore;

namespace Inspectify.BusinessLayer
{
    public interface IEmailProvider
    {
        Task<bool> SendEmail(string email, string subject, string body);
        Task<bool> SendWelcomeEmail();
        Task<bool> SendConfirmEmail(ApplicationUser user, string token);
        Task<bool> SendInvitationEmail(Invitation invitation);
        Task<bool> SendForgotPasswordEmail();
    }
    
    public class EmailProvider : IEmailProvider
    {
        private readonly InspectifyDbContext context;
        public EmailProvider(InspectifyDbContext context)
        {
            this.context = context;
        }

        public async Task<bool> SendConfirmEmail(ApplicationUser user, string token)
        {
            var subject = "Confirm your email";
            var body = $"Your Link - http://localhost:4200/confirmEmail?token={token}&email{user.Email}";
            return await SendEmail(user.Email, subject, body);
        }

        public async Task<bool> SendEmail(string email, string subject, string body)
        {
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
            string fromEmail = "shishlyannikov.dev@gmail.com";

            client.EnableSsl = true;
            MailAddress from = new MailAddress(fromEmail, $"Application name");
            MailAddress to = new MailAddress(email, $"{email}");
            MailMessage message = new MailMessage(from, to);
            message.Body = body;
            message.Subject = subject;
            NetworkCredential myCreds = new NetworkCredential(fromEmail, "", "");
            client.Credentials = myCreds;
            try
            {
                client.Credentials = new System.Net.NetworkCredential("shishlyannikov.dev@gmail.com", "Alexey1h2usf31");
                await client.SendMailAsync(message);
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<bool> SendForgotPasswordEmail()
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> SendInvitationEmail(Invitation invitation)
        {
            return Task.FromResult(true);
        }

        public Task<bool> SendWelcomeEmail()
        {
            throw new System.NotImplementedException();
        }
    }
}