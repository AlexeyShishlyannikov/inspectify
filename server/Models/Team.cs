using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using server.Models;

namespace Logistics.Models
{
    public class Team
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public ICollection<Vehicle> Vehicles { get; set; }
        public ICollection<ReportTeam> ReportTeams { get; set; }
        public ICollection<FormTeam> FormTeams { get; set; }
        public ICollection<PersonTeam> PersonTeams { get; set; }
    }
}
