using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using server.Models;

namespace Logistics.Models
{
    public class Report
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
        public int FormId { get; set; }
        public Form Form { get; set; }
        [Required]
        public int DriverId { get; set; }
        public Person Driver { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
        public ICollection<ReportCompany> ReportCompanies { get; set; }
        public ICollection<ReportTeam> ReportTeams { get; set; }
        public ICollection<FormInputValueReport> FormInputValueReports { get; set; }
    }
}
