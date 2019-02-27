using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using server.Models;

namespace server.Models
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
        [Required]
        public string CompanyId { get; set; }
        public Company Company { get; set; }
        public ICollection<Report> Reports { get; set; }
        public ICollection<PersonTeam> PersonTeams { get; set; }
    }
}
