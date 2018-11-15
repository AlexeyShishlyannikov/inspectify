using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Logistics.Models
{
    public class Company
    {
        [Required]
        [MaxLength(256)]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        public List<Team> Teams { get; set; }

        public Company()
        {
            Teams = new List<Team>();
        }
    }
}
