using System.ComponentModel.DataAnnotations;
using Logistics.Models;

namespace server.Models
{
    public class ReportCompany
    {
        [Required]
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        [Required]
        public int ReportId { get; set; }
        public Report Report { get; set; }
    }
}
