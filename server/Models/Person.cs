using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Inspectify.Models;

namespace Inspectify.Models
{
    public class Person
    {
        public string Id { get; set; }
        [Required]
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }

        public string FullName
        {
            get => this.FirstName + " " + this.LastName;
        }
        [Required]
        public string Email { get; set; }
        public string TeamId { get; set; }
        public Team Team { get; set; }
        [Required]
        public string CompanyId { get; set; }
        public Company Company { get; set; }
        public ICollection<Report> Reports { get; set; }
    }
}
