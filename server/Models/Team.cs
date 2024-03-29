using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Inspectify.Models;

namespace Inspectify.Models
{
    public class Team
    {
        public string Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public string CompanyId { get; set; }
        public Company Company { get; set; }
        public ICollection<Person> Persons { get; set; }
    }
}
