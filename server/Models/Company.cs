﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using server.Models;

namespace Logistics.Models
{
    public class Company
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        public string CompanyLogoUrl { get; set; }
        public ICollection<Team> Teams { get; set; }
        public ICollection<FormCompany> FormCompanies { get; set; }
        public ICollection<VehicleCompany> VehicleCompanies { get; set; }
        public ICollection<ReportCompany> ReportCompanies { get; set; }
    }
}
