using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using server.Models;

namespace Logistics.Models
{
    public class Form
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<Report> Reports { get; set; }
        public ICollection<FormCompany> FormCompanies { get; set; }
        public ICollection<FormTeam> FormTeams { get; set; }
        public ICollection<FormFormInput> FormFormInputs { get; set; }
    }

    public class FormInput
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public int FormId { get; set; }
        public Form Form { get; set; }
        public bool IsRequired { get; set; }
        [Required]
        public ReportFormInputType InputType { get; set; }
        public FormInputValue Value { get; set; }
        public ICollection<FormFormInput> FormFormInputs { get; set; }
    }

    public class FormInputValue
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int FormInputId { get; set; }
        public FormInput FormInput { get; set; }
        public string TextValue { get; set; }
        public double? NumberValue { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<FormInputValueReport> FormInputValueReports { get; set; }
    }

    public enum ReportFormInputType
    {
        Text,
        Number,
        Photo
    }
}
