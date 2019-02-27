using System.ComponentModel.DataAnnotations;
using server.Models;

namespace server.Models
{
    public class VehicleCompany
    {
        [Required]
        public string VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
        [Required]
        public string CompanyId { get; set; }
        public Company Company { get; set; }
    }
}
