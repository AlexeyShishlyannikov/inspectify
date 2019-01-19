using System.ComponentModel.DataAnnotations;
using Logistics.Models;

namespace server.Models
{
    public class FormInputValueReport
    {
        [Required]
        public int FormInputValueId { get; set; }
        public FormInputValue FormInputValue { get; set; }
        [Required]
        public int ReportId { get; set; }
        public Report Report { get; set; }
    }
}
