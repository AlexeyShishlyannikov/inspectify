using System.ComponentModel.DataAnnotations;
using Logistics.Models;

namespace server.Models
{
    public class ReportTeam
    {
        [Required]
        public int ReportId { get; set; }
        public Report Report { get; set; }
        [Required]
        public int TeamId { get; set; }
        public Team Team { get; set; }
    }
}
