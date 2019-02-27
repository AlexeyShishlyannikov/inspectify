using System;
using System.ComponentModel.DataAnnotations;
using server.Models;

namespace server.Models
{
    public class FormTeam
    {
        [Required]
        public string FormId { get; set; }
        public Form Form { get; set; }
        [Required]
        public string TeamId { get; set; }
        public Team Team { get; set; }
    }
}
