using System;
using System.ComponentModel.DataAnnotations;
using Logistics.Models;

namespace server.Models
{
    public class Invitation
    {
        public string Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
        public DateTime SentOn { get; set; }
        public string CompanyId { get; set; }
        public Company Company { get; set; }
    }
}