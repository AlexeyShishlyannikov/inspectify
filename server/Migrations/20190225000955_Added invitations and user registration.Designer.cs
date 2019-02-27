﻿// <auto-generated />
using System;
using server.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace server.Migrations
{
    [DbContext(typeof(LogisticsDbContext))]
    [Migration("20190225000955_Added invitations and user registration")]
    partial class Addedinvitationsanduserregistration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.1-servicing-10028")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Logistics.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Logistics.Models.Company", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ApplicationUserId")
                        .IsRequired();

                    b.Property<string>("LogoUrl");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("Logistics.Models.Form", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("Description");

                    b.Property<bool>("IsArchived");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<DateTime>("Updated");

                    b.HasKey("Id");

                    b.ToTable("Forms");
                });

            modelBuilder.Entity("Logistics.Models.FormFormInput", b =>
                {
                    b.Property<string>("FormId");

                    b.Property<string>("FormInputId");

                    b.HasKey("FormId", "FormInputId");

                    b.HasIndex("FormInputId");

                    b.ToTable("FormFormInputs");
                });

            modelBuilder.Entity("Logistics.Models.FormInput", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<int>("InputType");

                    b.Property<bool>("IsRequired");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("FormInputs");
                });

            modelBuilder.Entity("Logistics.Models.FormInputValue", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FormInputId")
                        .IsRequired();

                    b.Property<double?>("NumberValue");

                    b.Property<string>("PhotoUrl");

                    b.Property<string>("TextValue");

                    b.HasKey("Id");

                    b.HasIndex("FormInputId")
                        .IsUnique();

                    b.ToTable("FormInputValues");
                });

            modelBuilder.Entity("Logistics.Models.Person", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ApplicationUserId")
                        .IsRequired();

                    b.Property<string>("CompanyId")
                        .IsRequired();

                    b.Property<string>("FirstName")
                        .IsRequired();

                    b.Property<string>("LastName")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId");

                    b.HasIndex("CompanyId");

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("Logistics.Models.PersonTeam", b =>
                {
                    b.Property<string>("PersonId");

                    b.Property<string>("TeamId");

                    b.HasKey("PersonId", "TeamId");

                    b.HasIndex("TeamId");

                    b.ToTable("PersonTeams");
                });

            modelBuilder.Entity("Logistics.Models.Report", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateUpdated");

                    b.Property<string>("DriverId")
                        .IsRequired();

                    b.Property<string>("FormId")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("VehicleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("DriverId");

                    b.HasIndex("FormId");

                    b.HasIndex("VehicleId");

                    b.ToTable("Reports");
                });

            modelBuilder.Entity("Logistics.Models.Team", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CompanyId")
                        .IsRequired();

                    b.Property<string>("Description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("Logistics.Models.Vehicle", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("LicensePlate");

                    b.Property<string>("ModelId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("TeamId");

                    b.Property<int?>("Year");

                    b.HasKey("Id");

                    b.HasIndex("ModelId");

                    b.HasIndex("TeamId");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("Logistics.Models.VehicleMake", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("PhotoUrl")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("VehicleMarks");
                });

            modelBuilder.Entity("Logistics.Models.VehicleModel", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("MakeId")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("MakeId");

                    b.ToTable("VehicleModels");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("server.Models.FormCompany", b =>
                {
                    b.Property<string>("FormId");

                    b.Property<string>("CompanyId");

                    b.HasKey("FormId", "CompanyId");

                    b.HasIndex("CompanyId");

                    b.ToTable("FormCompanies");
                });

            modelBuilder.Entity("server.Models.FormInputValueReport", b =>
                {
                    b.Property<string>("ReportId");

                    b.Property<string>("FormInputValueId");

                    b.HasKey("ReportId", "FormInputValueId");

                    b.HasIndex("FormInputValueId");

                    b.ToTable("FormInputValueReports");
                });

            modelBuilder.Entity("server.Models.FormTeam", b =>
                {
                    b.Property<string>("FormId");

                    b.Property<string>("TeamId");

                    b.HasKey("FormId", "TeamId");

                    b.HasIndex("TeamId");

                    b.ToTable("FormTeams");
                });

            modelBuilder.Entity("server.Models.Invitation", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CompanyId");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FirstName")
                        .IsRequired();

                    b.Property<string>("LastName")
                        .IsRequired();

                    b.Property<string>("PhoneNumber")
                        .IsRequired();

                    b.Property<DateTime>("SentOn");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("Invitations");
                });

            modelBuilder.Entity("server.Models.ReportCompany", b =>
                {
                    b.Property<string>("ReportId");

                    b.Property<string>("CompanyId");

                    b.HasKey("ReportId", "CompanyId");

                    b.HasIndex("CompanyId");

                    b.ToTable("ReportCompanies");
                });

            modelBuilder.Entity("server.Models.ReportTeam", b =>
                {
                    b.Property<string>("ReportId");

                    b.Property<string>("TeamId");

                    b.HasKey("ReportId", "TeamId");

                    b.HasIndex("TeamId");

                    b.ToTable("ReportTeams");
                });

            modelBuilder.Entity("server.Models.VehicleCompany", b =>
                {
                    b.Property<string>("VehicleId");

                    b.Property<string>("CompanyId");

                    b.HasKey("VehicleId", "CompanyId");

                    b.HasIndex("CompanyId");

                    b.ToTable("VehicleCompanies");
                });

            modelBuilder.Entity("Logistics.Models.Company", b =>
                {
                    b.HasOne("Logistics.Models.ApplicationUser", "ApplicationUser")
                        .WithMany()
                        .HasForeignKey("ApplicationUserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Logistics.Models.FormFormInput", b =>
                {
                    b.HasOne("Logistics.Models.Form", "Form")
                        .WithMany("FormFormInputs")
                        .HasForeignKey("FormId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Logistics.Models.FormInput", "FormInput")
                        .WithMany("FormFormInputs")
                        .HasForeignKey("FormInputId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Logistics.Models.FormInputValue", b =>
                {
                    b.HasOne("Logistics.Models.FormInput", "FormInput")
                        .WithOne("Value")
                        .HasForeignKey("Logistics.Models.FormInputValue", "FormInputId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Logistics.Models.Person", b =>
                {
                    b.HasOne("Logistics.Models.ApplicationUser", "ApplicationUser")
                        .WithMany()
                        .HasForeignKey("ApplicationUserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Logistics.Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Logistics.Models.PersonTeam", b =>
                {
                    b.HasOne("Logistics.Models.Person", "Person")
                        .WithMany("PersonTeams")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Logistics.Models.Team", "Team")
                        .WithMany("PersonTeams")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Logistics.Models.Report", b =>
                {
                    b.HasOne("Logistics.Models.Person", "Driver")
                        .WithMany("Reports")
                        .HasForeignKey("DriverId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Logistics.Models.Form", "Form")
                        .WithMany("Reports")
                        .HasForeignKey("FormId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Logistics.Models.Vehicle", "Vehicle")
                        .WithMany("Reports")
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Logistics.Models.Team", b =>
                {
                    b.HasOne("Logistics.Models.Company", "Company")
                        .WithMany("Teams")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Logistics.Models.Vehicle", b =>
                {
                    b.HasOne("Logistics.Models.VehicleModel", "Model")
                        .WithMany()
                        .HasForeignKey("ModelId");

                    b.HasOne("Logistics.Models.Team", "Team")
                        .WithMany("Vehicles")
                        .HasForeignKey("TeamId");
                });

            modelBuilder.Entity("Logistics.Models.VehicleModel", b =>
                {
                    b.HasOne("Logistics.Models.VehicleMake", "Make")
                        .WithMany("Models")
                        .HasForeignKey("MakeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Logistics.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Logistics.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Logistics.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Logistics.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("server.Models.FormCompany", b =>
                {
                    b.HasOne("Logistics.Models.Company", "Company")
                        .WithMany("FormCompanies")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Logistics.Models.Form", "Form")
                        .WithMany("FormCompanies")
                        .HasForeignKey("FormId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("server.Models.FormInputValueReport", b =>
                {
                    b.HasOne("Logistics.Models.FormInputValue", "FormInputValue")
                        .WithMany("FormInputValueReports")
                        .HasForeignKey("FormInputValueId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Logistics.Models.Report", "Report")
                        .WithMany("FormInputValueReports")
                        .HasForeignKey("ReportId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("server.Models.FormTeam", b =>
                {
                    b.HasOne("Logistics.Models.Form", "Form")
                        .WithMany("FormTeams")
                        .HasForeignKey("FormId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Logistics.Models.Team", "Team")
                        .WithMany("FormTeams")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("server.Models.Invitation", b =>
                {
                    b.HasOne("Logistics.Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId");
                });

            modelBuilder.Entity("server.Models.ReportCompany", b =>
                {
                    b.HasOne("Logistics.Models.Company", "Company")
                        .WithMany("ReportCompanies")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Logistics.Models.Report", "Report")
                        .WithMany("ReportCompanies")
                        .HasForeignKey("ReportId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("server.Models.ReportTeam", b =>
                {
                    b.HasOne("Logistics.Models.Team", "Team")
                        .WithMany("ReportTeams")
                        .HasForeignKey("ReportId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Logistics.Models.Report", "Report")
                        .WithMany("ReportTeams")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("server.Models.VehicleCompany", b =>
                {
                    b.HasOne("Logistics.Models.Company", "Company")
                        .WithMany("VehicleCompanies")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Logistics.Models.Vehicle", "Vehicle")
                        .WithMany("VehicleCompanies")
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
