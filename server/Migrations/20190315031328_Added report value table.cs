using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Inspectify.Migrations
{
    public partial class Addedreportvaluetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Persons_DriverId",
                table: "Reports");

            migrationBuilder.DropTable(
                name: "ReportCompany");

            migrationBuilder.DropTable(
                name: "ReportTeam");

            migrationBuilder.RenameColumn(
                name: "DriverId",
                table: "Reports",
                newName: "PersonId");

            migrationBuilder.RenameIndex(
                name: "IX_Reports_DriverId",
                table: "Reports",
                newName: "IX_Reports_PersonId");

            migrationBuilder.AddColumn<string>(
                name: "ItemId",
                table: "Reports",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ReportValues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<string>(nullable: true),
                    FieldId = table.Column<string>(nullable: false),
                    ReportId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReportValues_FormFields_FieldId",
                        column: x => x.FieldId,
                        principalTable: "FormFields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReportValues_Reports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "Reports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ItemId",
                table: "Reports",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportValues_FieldId",
                table: "ReportValues",
                column: "FieldId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportValues_ReportId",
                table: "ReportValues",
                column: "ReportId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Items_ItemId",
                table: "Reports",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Persons_PersonId",
                table: "Reports",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Items_ItemId",
                table: "Reports");

            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Persons_PersonId",
                table: "Reports");

            migrationBuilder.DropTable(
                name: "ReportValues");

            migrationBuilder.DropIndex(
                name: "IX_Reports_ItemId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Reports");

            migrationBuilder.RenameColumn(
                name: "PersonId",
                table: "Reports",
                newName: "DriverId");

            migrationBuilder.RenameIndex(
                name: "IX_Reports_PersonId",
                table: "Reports",
                newName: "IX_Reports_DriverId");

            migrationBuilder.CreateTable(
                name: "ReportCompany",
                columns: table => new
                {
                    ReportId = table.Column<string>(nullable: false),
                    CompanyId = table.Column<string>(nullable: false)
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

            migrationBuilder.CreateIndex(
                name: "IX_ReportCompany_CompanyId",
                table: "ReportCompany",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportTeam_TeamId",
                table: "ReportTeam",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Persons_DriverId",
                table: "Reports",
                column: "DriverId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
