using Microsoft.EntityFrameworkCore.Migrations;

namespace Logistics.Migrations
{
    public partial class AddedForeignKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PersonId",
                table: "Reports",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "Persons",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Forms",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_TeamId",
                table: "Vehicles",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_PersonId",
                table: "Reports",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_Persons_TeamId",
                table: "Persons",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Forms_TeamId",
                table: "Forms",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Forms_Teams_TeamId",
                table: "Forms",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_Teams_TeamId",
                table: "Persons",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Persons_PersonId",
                table: "Reports",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Teams_TeamId",
                table: "Vehicles",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Forms_Teams_TeamId",
                table: "Forms");

            migrationBuilder.DropForeignKey(
                name: "FK_Persons_Teams_TeamId",
                table: "Persons");

            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Persons_PersonId",
                table: "Reports");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Teams_TeamId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_TeamId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Reports_PersonId",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_Persons_TeamId",
                table: "Persons");

            migrationBuilder.DropIndex(
                name: "IX_Forms_TeamId",
                table: "Forms");

            migrationBuilder.DropColumn(
                name: "PersonId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Forms");
        }
    }
}
