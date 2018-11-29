using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Logistics.Models
{
    public class Team
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        [Required]
        public int CompanyId { get; set; }
        public Company Company { get; set; }

        public List<Person> Members { get; set; }
        public List<Vehicle> Vehicles { get; set; }
        public List<VehicleReport> VehicleReports { get; set; }
        public List<ReportForm> ReportForms { get; set; }

        public Team()
        {
            Members = new List<Person>();
            Vehicles = new List<Vehicle>();
            VehicleReports = new List<VehicleReport>();
            ReportForms = new List<ReportForm>();
        }
    }
}
