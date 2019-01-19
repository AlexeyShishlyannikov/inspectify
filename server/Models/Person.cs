using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using server.Models;

namespace Logistics.Models
{
    public class Person
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string ApplicationUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int CompanyId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public ICollection<Report> Reports { get; set; }
        public ICollection<PersonTeam> PersonTeams { get; set; }
    }
}
