using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Inspectify.Models;

namespace Inspectify.Models
{
    public class Form
    {
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsArchived { get; set; }
        public DateTime Created { get; set; }
        [Required]
        public string CompanyId { get; set; }
        public Company Company { get; set; }
        public IEnumerable<Field> Fields { get; set; }
    }

    public class Field
    {
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public int SortIndex { get; set; }
        public bool IsRequired { get; set; }
        [Required]
        public FieldType Type { get; set; }
        public IEnumerable<Option> Options { get; set; }
        public string FormId { get; set; }
        public Form Form { get; set; }
    }

    public class Option
    {
        public string Id { get; set; }
        public bool IsArchived { get; set; }
        public string Value { get; set; }
        [Required]
        public string FieldId { get; set; }
        public Field Field { get; set; }
    }

    public enum FieldType
    {
        Input = 0,
        Textarea = 1,
        Radio = 2,
        Select = 3,
        Multiselect = 4,
        Checkbox = 5,
        Photo = 6
    }
}
