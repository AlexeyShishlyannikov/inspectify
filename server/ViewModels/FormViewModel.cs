using System.Collections.Generic;
using Inspectify.Models;

namespace Inspectify.ViewModels
{
    public class FormViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public IEnumerable<Field> FormInputs { get; set; }
    }

    public class FormInputViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool isRequired { get; set; }
        public FieldType InputType { get; set; }
    }

    public class FormInputValueViewModel
    {
        public string Id { get; set; }
        public string FormInputId { get; set; }
        public string TextValue { get; set; }
        public double? NumberValue { get; set; }
        public string PhotoUrl { get; set; }
    }
}