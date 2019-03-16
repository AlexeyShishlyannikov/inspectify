using Inspectify.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Inspectify.DAL
{
    public class InspectifyDbContext : IdentityDbContext<ApplicationUser>
    {
        // People
        public DbSet<Company> Companies { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        // Forms
        public DbSet<Form> Forms { get; set; }
        public DbSet<Field> FormFields { get; set; }
        public DbSet<Option> FormFieldOptions { get; set; }
        // Inventory
        public DbSet<Template> Templates { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemValue> ItemValues { get; set; }
        // Reports
        public DbSet<Report> Reports { get; set; }
        public DbSet<ReportValue> ReportValues { get; set; }

        public InspectifyDbContext(DbContextOptions<InspectifyDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
