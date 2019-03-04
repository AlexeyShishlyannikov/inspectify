using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Inspectify.Models;

namespace Inspectify.Models
{
    public class Vehicle
    {
        public string Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        public int? Year { get; set; }
        public string LicensePlate { get; set; }
        public string ModelId { get; set; }
        public VehicleModel Model { get; set; }
        public string TeamId { get; set; }
        public Team Team { get; set; }
        public ICollection<Report> Reports { get; set; }
        public ICollection<VehicleCompany> VehicleCompanies { get; set; }
    }

    public class VehicleMake
    {
        public string Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        [Required]
        public string PhotoUrl { get; set; }
        public ICollection<VehicleModel> Models { get; set; }
    }

    public class VehicleModel
    {
        public string Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        [Required]
        public string MakeId { get; set; }
        public VehicleMake Make { get; set; }
    }
}
