using Microsoft.EntityFrameworkCore.Migrations;

namespace Logistics.Migrations
{
    public partial class FormRelationshipsUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FormInputValues_InputId",
                table: "FormInputValues");

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "Reports",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reports_TeamId",
                table: "Reports",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_FormInputValues_InputId",
                table: "FormInputValues",
                column: "InputId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Teams_TeamId",
                table: "Reports",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Teams_TeamId",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_Reports_TeamId",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_FormInputValues_InputId",
                table: "FormInputValues");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Reports");

            migrationBuilder.CreateIndex(
                name: "IX_FormInputValues_InputId",
                table: "FormInputValues",
                column: "InputId");
        }
    }
}
