using Microsoft.EntityFrameworkCore.Migrations;

namespace Logistics.Migrations
{
    public partial class changednames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ModelId",
                table: "Vehicles",
                newName: "VehicleModelId");

            migrationBuilder.RenameColumn(
                name: "MarkId",
                table: "VehicleModels",
                newName: "VehicleMarkId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_VehicleModelId",
                table: "Vehicles",
                column: "VehicleModelId");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleModels_VehicleMarkId",
                table: "VehicleModels",
                column: "VehicleMarkId");

            migrationBuilder.CreateIndex(
                name: "IX_Teams_CompanyId",
                table: "Teams",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_Companies_CompanyId",
                table: "Teams",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleModels_VehicleMarks_VehicleMarkId",
                table: "VehicleModels",
                column: "VehicleMarkId",
                principalTable: "VehicleMarks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_VehicleModels_VehicleModelId",
                table: "Vehicles",
                column: "VehicleModelId",
                principalTable: "VehicleModels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_Companies_CompanyId",
                table: "Teams");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleModels_VehicleMarks_VehicleMarkId",
                table: "VehicleModels");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_VehicleModels_VehicleModelId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_VehicleModelId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_VehicleModels_VehicleMarkId",
                table: "VehicleModels");

            migrationBuilder.DropIndex(
                name: "IX_Teams_CompanyId",
                table: "Teams");

            migrationBuilder.RenameColumn(
                name: "VehicleModelId",
                table: "Vehicles",
                newName: "ModelId");

            migrationBuilder.RenameColumn(
                name: "VehicleMarkId",
                table: "VehicleModels",
                newName: "MarkId");
        }
    }
}
