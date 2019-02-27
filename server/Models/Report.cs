using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using server.Models;

namespace server.Models
{
    public class Report
    {
        public string Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        [Required]
        public string VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
        [Required]
        public string FormId { get; set; }
        public Form Form { get; set; }
        [Required]
        public string DriverId { get; set; }
        public Person Driver { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
        public ICollection<ReportCompany> ReportCompanies { get; set; }
        public ICollection<ReportTeam> ReportTeams { get; set; }
        public ICollection<FormInputValueReport> FormInputValueReports { get; set; }
    }
}
