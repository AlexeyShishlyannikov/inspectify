using Logistics.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Logistics.DAL
{
    public class LogisticsDbContext: IdentityDbContext<ApplicationUser>
    {
        // People
        public DbSet<Company> Companies { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Person> Persons { get; set; }
        // Vehicles
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<VehicleModel> VehicleModels { get; set; }
        public DbSet<VehicleMark> VehicleMarks { get; set; }
        // Reports
        public DbSet<VehicleReport> Reports { get; set; }
        // Forms
        public DbSet<ReportForm> Forms { get; set; }
        public DbSet<ReportFormInput> FormInputs { get; set; }
        public DbSet<ReportFormInputValue> FormInputValues { get; set; }

        public LogisticsDbContext(DbContextOptions<LogisticsDbContext> options) : base(options) {}
    }
}
