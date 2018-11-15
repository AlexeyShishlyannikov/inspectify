using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Logistics.Models
{
    public class Vehicle
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        [Required]
        public int ModelId { get; set; }
        public VehicleModel Model { get; set; }
        [Required]
        public int TeamId { get; set; }
        public int? Year { get; set; }
        public string LicensePlate { get; set; }
        public string VIN { get; set; }
    }

    public class VehicleModel
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        [Required]
        public int MarkId { get; set; }
        public VehicleMark Mark { get; set; }
    }

    public class VehicleMark
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        public List<VehicleModel> Models { get; set; }

        public VehicleMark()
        {
            Models = new List<VehicleModel>();
        }
    }
}
