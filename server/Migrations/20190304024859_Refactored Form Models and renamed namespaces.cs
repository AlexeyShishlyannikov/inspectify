using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Inspectify.Migrations
{
    public partial class RefactoredFormModelsandrenamednamespaces : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FormCompanies");

            migrationBuilder.DropTable(
                name: "FormFormInputs");

            migrationBuilder.DropTable(
                name: "FormInputValueReports");

            migrationBuilder.DropTable(
                name: "FormTeams");

            migrationBuilder.DropTable(
                name: "ReportCompanies");

            migrationBuilder.DropTable(
                name: "ReportTeams");

            migrationBuilder.DropTable(
                name: "FormInputValues");

            migrationBuilder.DropTable(
                name: "FormInputs");

            migrationBuilder.DropColumn(
                name: "Updated",
                table: "Forms");

            migrationBuilder.AddColumn<string>(
                name: "CompanyId",
                table: "Forms",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Inputs",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    SortIndex = table.Column<int>(nullable: false),
                    IsRequired = table.Column<bool>(nullable: false),
                    FormId = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inputs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Inputs_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Forms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReportCompany",
                columns: table => new
                {
                    CompanyId = table.Column<string>(nullable: false),
                    ReportId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportCompany", x => new { x.ReportId, x.CompanyId });
                    table.ForeignKey(
                        name: "FK_ReportCompany_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReportCompany_Reports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "Reports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReportTeam",
                columns: table => new
                {
                    ReportId = table.Column<string>(nullable: false),
                    TeamId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportTeam", x => new { x.ReportId, x.TeamId });
                    table.ForeignKey(
                        name: "FK_ReportTeam_Teams_ReportId",
                        column: x => x.ReportId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReportTeam_Reports_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Reports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InputOptions",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FieldId = table.Column<string>(nullable: false),
                    IsArchived = table.Column<bool>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InputOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InputOptions_Inputs_FieldId",
                        column: x => x.FieldId,
                        principalTable: "Inputs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Forms_CompanyId",
                table: "Forms",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_InputOptions_FieldId",
                table: "InputOptions",
                column: "FieldId");

            migrationBuilder.CreateIndex(
                name: "IX_Inputs_FormId",
                table: "Inputs",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportCompany_CompanyId",
                table: "ReportCompany",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportTeam_TeamId",
                table: "ReportTeam",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Forms_Companies_CompanyId",
                table: "Forms",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Forms_Companies_CompanyId",
                table: "Forms");

            migrationBuilder.DropTable(
                name: "InputOptions");

            migrationBuilder.DropTable(
                name: "ReportCompany");

            migrationBuilder.DropTable(
                name: "ReportTeam");

            migrationBuilder.DropTable(
                name: "Inputs");

            migrationBuilder.DropIndex(
                name: "IX_Forms_CompanyId",
                table: "Forms");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Forms");

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated",
                table: "Forms",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "FormCompanies",
                columns: table => new
                {
                    FormId = table.Column<string>(nullable: false),
                    CompanyId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormCompanies", x => new { x.FormId, x.CompanyId });
                    table.ForeignKey(
                        name: "FK_FormCompanies_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormCompanies_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Forms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormInputs",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    InputType = table.Column<int>(nullable: false),
                    IsRequired = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormInputs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FormTeams",
                columns: table => new
                {
                    FormId = table.Column<string>(nullable: false),
                    TeamId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormTeams", x => new { x.FormId, x.TeamId });
                    table.ForeignKey(
                        name: "FK_FormTeams_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Forms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormTeams_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReportCompanies",
                columns: table => new
                {
                    ReportId = table.Column<string>(nullable: false),
                    CompanyId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportCompanies", x => new { x.ReportId, x.CompanyId });
                    table.ForeignKey(
                        name: "FK_ReportCompanies_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReportCompanies_Reports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "Reports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReportTeams",
                columns: table => new
                {
                    ReportId = table.Column<string>(nullable: false),
                    TeamId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportTeams", x => new { x.ReportId, x.TeamId });
                    table.ForeignKey(
                        name: "FK_ReportTeams_Teams_ReportId",
                        column: x => x.ReportId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReportTeams_Reports_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Reports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormFormInputs",
                columns: table => new
                {
                    FormId = table.Column<string>(nullable: false),
                    FormInputId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormFormInputs", x => new { x.FormId, x.FormInputId });
                    table.ForeignKey(
                        name: "FK_FormFormInputs_Forms_FormId",
                        column: x => x.FormId,
                        principalTable: "Forms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormFormInputs_FormInputs_FormInputId",
                        column: x => x.FormInputId,
                        principalTable: "FormInputs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormInputValues",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FormInputId = table.Column<string>(nullable: false),
                    NumberValue = table.Column<double>(nullable: true),
                    PhotoUrl = table.Column<string>(nullable: true),
                    TextValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormInputValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormInputValues_FormInputs_FormInputId",
                        column: x => x.FormInputId,
                        principalTable: "FormInputs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormInputValueReports",
                columns: table => new
                {
                    ReportId = table.Column<string>(nullable: false),
                    FormInputValueId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormInputValueReports", x => new { x.ReportId, x.FormInputValueId });
                    table.ForeignKey(
                        name: "FK_FormInputValueReports_FormInputValues_FormInputValueId",
                        column: x => x.FormInputValueId,
                        principalTable: "FormInputValues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormInputValueReports_Reports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "Reports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FormCompanies_CompanyId",
                table: "FormCompanies",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_FormFormInputs_FormInputId",
                table: "FormFormInputs",
                column: "FormInputId");

            migrationBuilder.CreateIndex(
                name: "IX_FormInputValueReports_FormInputValueId",
                table: "FormInputValueReports",
                column: "FormInputValueId");

            migrationBuilder.CreateIndex(
                name: "IX_FormInputValues_FormInputId",
                table: "FormInputValues",
                column: "FormInputId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FormTeams_TeamId",
                table: "FormTeams",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportCompanies_CompanyId",
                table: "ReportCompanies",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportTeams_TeamId",
                table: "ReportTeams",
                column: "TeamId");
        }
    }
}
