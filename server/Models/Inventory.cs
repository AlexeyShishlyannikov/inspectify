using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Inspectify.Models
{
    public class Template
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<Property> Properties { get; set; }
        [Required]
        public string CompanyId { get; set; }
        public Company Company { get; set; }
        public List<Item> Items { get; set; }
    }

    public class Property
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool isRequired { get; set; }
        public PropertyType type { get; set; }
        [Required]
        public string TemplateId { get; set; }
        public Template Template { get; set; }
    }

    public enum PropertyType
    {
        String,
        Number,
        Photo
    }

    public class Item
    {
        public string Id { get; set; }
        public string Name { get; set; }
        [Required]
        public string TemplateId { get; set; }
        public Template Template { get; set; }
        public List<ItemValue> Values { get; set; }
    }

    public class ItemValue
    {
        public int? Id { get; set; }
        public string Value { get; set; }
        [Required]
        public string ItemId { get; set; }
        public Item Item { get; set; }
        [Required]
        public int PropertyId { get; set; }
        public Property Property { get; set; }
    }
}