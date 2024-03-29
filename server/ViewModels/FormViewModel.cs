using System;
using System.Collections.Generic;
using Inspectify.Models;

namespace Inspectify.ViewModels
{
    public class FormViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsArchived { get; set; }
        public DateTime Created { get; set; }
        public List<FieldViewModel> Fields { get; set; }
    }

    public class FieldViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int SortIndex { get; set; }
        public bool isRequired { get; set; }
        public FieldType Type { get; set; }
        public List<OptionViewModel> Options { get; set; }
    }

    public class OptionViewModel
    {
        public string Id { get; set; }
        public string Value { get; set; }
    }
}
