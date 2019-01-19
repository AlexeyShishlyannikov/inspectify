using Logistics.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace Logistics.DAL
{
    public class LogisticsDbContext : IdentityDbContext<ApplicationUser>
    {
        // People
        public DbSet<Company> Companies { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<PersonTeam> PersonTeams { get; set; }
        // Vehicles
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<VehicleModel> VehicleModels { get; set; }
        public DbSet<VehicleMake> VehicleMarks { get; set; }
        public DbSet<VehicleCompany> VehicleCompanies { get; set; }
        // Reports
        public DbSet<Report> Reports { get; set; }
        public DbSet<ReportCompany> ReportCompanies { get; set; }
        public DbSet<ReportTeam> ReportTeams { get; set; }
        public DbSet<FormInputValueReport> FormInputValueReports { get; set; }
        // Forms
        public DbSet<Form> Forms { get; set; }
        public DbSet<FormInput> FormInputs { get; set; }
        public DbSet<FormTeam> FormTeams { get; set; }
        public DbSet<FormFormInput> FormFormInputs { get; set; }
        public DbSet<FormCompany> FormCompanies { get; set; }
        public DbSet<FormInputValue> FormInputValues { get; set; }

        public LogisticsDbContext(DbContextOptions<LogisticsDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Person to Teams
            builder.Entity<PersonTeam>().HasKey(vc => new { vc.PersonId, vc.TeamId });
            builder.Entity<PersonTeam>().HasOne(vc => vc.Person).WithMany(v => v.PersonTeams).HasForeignKey(vc => vc.PersonId);
            builder.Entity<PersonTeam>().HasOne(vc => vc.Team).WithMany(v => v.PersonTeams).HasForeignKey(vc => vc.TeamId);
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
            // Forms to Form Inputs
            builder.Entity<FormFormInput>().HasKey(vc => new { vc.FormId, vc.FormInputId });
            builder.Entity<FormFormInput>().HasOne(vc => vc.FormInput).WithMany(v => v.FormFormInputs).HasForeignKey(vc => vc.FormInputId);
            builder.Entity<FormFormInput>().HasOne(vc => vc.Form).WithMany(v => v.FormFormInputs).HasForeignKey(vc => vc.FormId);
            // Forms to Companies
            builder.Entity<FormCompany>().HasKey(vc => new { vc.FormId, vc.CompanyId });
            builder.Entity<FormCompany>().HasOne(vc => vc.Company).WithMany(v => v.FormCompanies).HasForeignKey(vc => vc.CompanyId);
            builder.Entity<FormCompany>().HasOne(vc => vc.Form).WithMany(v => v.FormCompanies).HasForeignKey(vc => vc.FormId);
            // Forms to Teams
            builder.Entity<FormTeam>().HasKey(vc => new { vc.FormId, vc.TeamId });
            builder.Entity<FormTeam>().HasOne(vc => vc.Team).WithMany(v => v.FormTeams).HasForeignKey(vc => vc.TeamId);
            builder.Entity<FormTeam>().HasOne(vc => vc.Form).WithMany(v => v.FormTeams).HasForeignKey(vc => vc.FormId);
            // Report to Input Values
            builder.Entity<FormInputValueReport>().HasKey(vc => new { vc.ReportId, vc.FormInputValueId });
            builder.Entity<FormInputValueReport>().HasOne(vc => vc.Report).WithMany(v => v.FormInputValueReports).HasForeignKey(vc => vc.ReportId);
            builder.Entity<FormInputValueReport>().HasOne(vc => vc.FormInputValue).WithMany(v => v.FormInputValueReports).HasForeignKey(vc => vc.FormInputValueId);
        }
    }
}
