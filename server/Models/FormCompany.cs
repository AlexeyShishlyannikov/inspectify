using System;
using System.ComponentModel.DataAnnotations;
using server.Models;

namespace server.Models
{
    public class FormCompany
    {
        [Required]
        public string FormId { get; set; }
        public Form Form { get; set; }
        [Required]
        public string CompanyId { get; set; }
        public Company Company { get; set; }
    }
}
