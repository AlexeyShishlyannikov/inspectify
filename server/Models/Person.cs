using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Logistics.Models
{
    public class Person
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public List<VehicleReport> Reports { get; set; }

        public Person()
        {
            Reports = new List<VehicleReport>();
        }
    }
}
