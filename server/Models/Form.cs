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
        public string CompanyId { get; set; }
        public Company Company { get; set; }
        public DateTime Created { get; set; }
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
        public string FormId { get; set; }
        public Form Form { get; set; }
        [Required]
        public FieldType Type { get; set; }
        public IEnumerable<Option> Options { get; set; }
    }

    public class Option
    {
        public string Id { get; set; }
        [Required]
        public string FieldId { get; set; }
        public Field Field { get; set; }
        public bool IsArchived { get; set; }
        public string Value { get; set; }
    }

    public enum FieldType
    {
        Input,
        Textarea,
        Radio,
        Select,
        Multiselect,
        Checkbox,
        Photo
    }
}
