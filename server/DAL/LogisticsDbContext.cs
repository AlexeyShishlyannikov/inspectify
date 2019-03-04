using Inspectify.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Inspectify.DAL
{
    public class LogisticsDbContext : IdentityDbContext<ApplicationUser>
    {
        // People
        public DbSet<Company> Companies { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        // Vehicles
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<VehicleModel> VehicleModels { get; set; }
        public DbSet<VehicleMake> VehicleMarks { get; set; }
        public DbSet<VehicleCompany> VehicleCompanies { get; set; }
        // Reports
        public DbSet<Report> Reports { get; set; }
        // Forms
        public DbSet<Form> Forms { get; set; }
        public DbSet<Field> Inputs { get; set; }
        public DbSet<Option> InputOptions { get; set; }

        public LogisticsDbContext(DbContextOptions<LogisticsDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Vehicle to Companies
            builder.Entity<VehicleCompany>().HasKey(vc => new { vc.VehicleId, vc.CompanyId });
            builder.Entity<VehicleCompany>().HasOne(vc => vc.Company).WithMany(v => v.VehicleCompanies).HasForeignKey(vc => vc.CompanyId);
            builder.Entity<VehicleCompany>().HasOne(vc => vc.Vehicle).WithMany(v => v.VehicleCompanies).HasForeignKey(vc => vc.VehicleId);
            // Report to Companies
            builder.Entity<ReportCompany>().HasKey(vc => new { vc.ReportId, vc.CompanyId });
            builder.Entity<ReportCompany>().HasOne(vc => vc.Company).WithMany(v => v.ReportCompanies).HasForeignKey(vc => vc.CompanyId);
            builder.Entity<ReportCompany>().HasOne(vc => vc.Report).WithMany(v => v.ReportCompanies).HasForeignKey(vc => vc.ReportId);
            // Report to Teams
            builder.Entity<ReportTeam>().HasKey(vc => new { vc.ReportId, vc.TeamId });
            builder.Entity<ReportTeam>().HasOne(vc => vc.Report).WithMany(v => v.ReportTeams).HasForeignKey(vc => vc.TeamId);
            builder.Entity<ReportTeam>().HasOne(vc => vc.Team).WithMany(v => v.ReportTeams).HasForeignKey(vc => vc.ReportId);
        }
    }
}
