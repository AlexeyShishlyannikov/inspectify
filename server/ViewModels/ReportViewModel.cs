using System;
using System.Collections.Generic;

namespace Inspectify.ViewModels
{
    public class ReportViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int VehicleId { get; set; }
        public int FormId { get; set; }
        public int DriverId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}