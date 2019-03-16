using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Inspectify.Models;

namespace Inspectify.Models
{
    public class Report
    {
        public string Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        public string ItemId { get; set; }
        public Item Item { get; set; }
        [Required]
        public string FormId { get; set; }
        public Form Form { get; set; }
        [Required]
        public string PersonId { get; set; }
        public Person Person { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
        public List<ReportValue> Values { get; set; }
    }

    public class ReportValue
    {
        public int Id { get; set; }
        public string Value { get; set; }
        [Required]
        public string FieldId { get; set; }
        public Field Field { get; set; }
        [Required]
        public string ReportId { get; set; }
        public Report Report { get; set; }
    }
}
