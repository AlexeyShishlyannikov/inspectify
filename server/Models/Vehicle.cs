using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using server.Models;

namespace Logistics.Models
{
    public class Vehicle
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        public int? Year { get; set; }
        public string LicensePlate { get; set; }
        public string VIN { get; set; }
        [Required]
        public int ModelId { get; set; }
        public VehicleModel Model { get; set; }
        [Required]
        public int TeamId { get; set; }
        public Team Team { get; set; }
        public ICollection<Report> Reports { get; set; }
        public ICollection<VehicleCompany> VehicleCompanies { get; set; }
    }

    public class VehicleMake
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        [Required]
        public string PhotoUrl { get; set; }
        public ICollection<VehicleModel> Models { get; set; }
    }

    public class VehicleModel
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        [Required]
        public int MakeId { get; set; }
        public VehicleMake Make { get; set; }
    }
}
