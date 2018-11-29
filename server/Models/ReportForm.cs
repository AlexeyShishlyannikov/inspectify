using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Logistics.Models
{
    public class ReportForm
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int TeamId { get; set; }
        public Team Team { get; set; }
        public List<VehicleReport> Reports { get; set; }
        public List<ReportFormInput> Inputs { get; set; }

        public ReportForm()
        {
            Inputs = new List<ReportFormInput>();
            Reports = new List<VehicleReport>();
        }
    }

    public class ReportFormInput
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int FormId { get; set; }
        public ReportForm Form { get; set; }
        public bool IsRequired { get; set; }
        [Required]
        public ReportFormInputType InputType { get; set; }
        public ReportFormInputValue Value { get; set; }
    }

    public class ReportFormInputValue
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int InputId { get; set; }
        public ReportFormInput Input { get; set; }
        public string TextValue { get; set; }
        public double? NumberValue { get; set; }
    }

    public enum ReportFormInputType
    {
        Text,
        Number
    }
}
