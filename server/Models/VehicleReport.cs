using System;
using System.ComponentModel.DataAnnotations;

namespace Logistics.Models
{
    public class VehicleReport
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        [Required]
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
        [Required]
        public int ReportFormId { get; set; }
        public ReportForm ReportForm { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        [Range(1, 11)]
        public int Rate { get; set; }
        [Required]
        public int TeamId { get; set; }
        public Team Team { get; set; }
    }
}
