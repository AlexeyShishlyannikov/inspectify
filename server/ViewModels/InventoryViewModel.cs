using System.Collections.Generic;
using Inspectify.Models;

namespace Inspectify.ViewModels
{
    public class TemplateViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<PropertyViewModel> Properties { get; set; }
    }

    public class PropertyViewModel
    {
        public int Id { get; set; }
        public PropertyType type { get; set; }
        public string Name { get; set; }
    }

    public class ItemViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public TemplateViewModel Template { get; set; }
        public List<ItemValueViewModel> Values { get; set; }
    }

    public class ItemValueViewModel
    {
        public int? Id { get; set; }
        public PropertyViewModel Property { get; set; }
        public string Value { get; set; }
    }
}