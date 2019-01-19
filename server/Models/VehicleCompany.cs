using System.ComponentModel.DataAnnotations;
using Logistics.Models;

namespace server.Models
{
    public class VehicleCompany
    {
        [Required]
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
        [Required]
        public int CompanyId { get; set; }
        public Company Company { get; set; }
    }
}
