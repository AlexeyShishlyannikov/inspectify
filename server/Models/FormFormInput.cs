using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using server.Models;

namespace Logistics.Models
{
    public class FormFormInput
    {
        [Required]
        public string FormId { get; set; }
        public Form Form { get; set; }
        [Required]
        public string FormInputId { get; set; }
        public FormInput FormInput { get; set; }
    }
}
