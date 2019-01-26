using System.Collections.Generic;
using Logistics.Models;

namespace server.ViewModels
{
    public class FormViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<FormInput> FormInputs { get; set; }
    }

    public class FormInputViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool isRequired { get; set; }
        public ReportFormInputType InputType { get; set; }
    }

    public class FormInputValueViewModel
    {
        public int Id { get; set; }
        public int FormInputId { get; set; }
        public string TextValue { get; set; }
        public double? NumberValue { get; set; }
        public string PhotoUrl { get; set; }
    }
}