using Microsoft.EntityFrameworkCore.Migrations;

namespace Inspectify.Migrations
{
    public partial class Changedteamtopersonmapping : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PersonTeams");

            migrationBuilder.AddColumn<string>(
                name: "TeamId",
                table: "Persons",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Persons_TeamId",
                table: "Persons",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_Teams_TeamId",
                table: "Persons",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Persons_Teams_TeamId",
                table: "Persons");

            migrationBuilder.DropIndex(
                name: "IX_Persons_TeamId",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Persons");

            migrationBuilder.CreateTable(
                name: "PersonTeams",
                columns: table => new
                {
                    PersonId = table.Column<string>(nullable: false),
                    TeamId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonTeams", x => new { x.PersonId, x.TeamId });
                    table.ForeignKey(
                        name: "FK_PersonTeams_Persons_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PersonTeams_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PersonTeams_TeamId",
                table: "PersonTeams",
                column: "TeamId");
        }
    }
}
