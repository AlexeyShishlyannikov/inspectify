using System.ComponentModel.DataAnnotations;
using Inspectify.Models;

namespace Inspectify.Models
{
    public class ReportCompany
    {
        [Required]
        public string CompanyId { get; set; }
        public Company Company { get; set; }
        [Required]
        public string ReportId { get; set; }
        public Report Report { get; set; }
    }
}
