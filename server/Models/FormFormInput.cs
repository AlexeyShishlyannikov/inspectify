using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using server.Models;

namespace Logistics.Models
{
    public class FormFormInput
    {
        [Required]
        public int FormId { get; set; }
        public Form Form { get; set; }
        [Required]
        public int FormInputId { get; set; }
        public FormInput FormInput { get; set; }
    }
}
