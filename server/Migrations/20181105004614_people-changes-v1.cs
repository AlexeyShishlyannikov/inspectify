using Microsoft.EntityFrameworkCore.Migrations;

namespace Logistics.Migrations
{
    public partial class peoplechangesv1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Forms_Reports_ReportId",
                table: "Forms");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleModels_VehicleMarks_VehicleMarkId",
                table: "VehicleModels");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_VehicleModels_VehicleModelId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Forms_ReportId",
                table: "Forms");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "ReportId",
                table: "Forms");

            migrationBuilder.RenameColumn(
                name: "VehicleModelId",
                table: "Vehicles",
                newName: "ModelId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_VehicleModelId",
                table: "Vehicles",
                newName: "IX_Vehicles_ModelId");

            migrationBuilder.RenameColumn(
                name: "VehicleMarkId",
                table: "VehicleModels",
                newName: "MarkId");

            migrationBuilder.RenameIndex(
                name: "IX_VehicleModels_VehicleMarkId",
                table: "VehicleModels",
                newName: "IX_VehicleModels_MarkId");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Reports",
                newName: "DateCreated");

            migrationBuilder.AddColumn<int>(
                name: "ReportFormId",
                table: "Reports",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsRequired",
                table: "FormInputs",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ReportFormId",
                table: "Reports",
                column: "ReportFormId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Forms_ReportFormId",
                table: "Reports",
                column: "ReportFormId",
                principalTable: "Forms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleModels_VehicleMarks_MarkId",
                table: "VehicleModels",
                column: "MarkId",
                principalTable: "VehicleMarks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_VehicleModels_ModelId",
                table: "Vehicles",
                column: "ModelId",
                principalTable: "VehicleModels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Forms_ReportFormId",
                table: "Reports");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleModels_VehicleMarks_MarkId",
                table: "VehicleModels");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_VehicleModels_ModelId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Reports_ReportFormId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "ReportFormId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "IsRequired",
                table: "FormInputs");

            migrationBuilder.RenameColumn(
                name: "ModelId",
                table: "Vehicles",
                newName: "VehicleModelId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_ModelId",
                table: "Vehicles",
                newName: "IX_Vehicles_VehicleModelId");

            migrationBuilder.RenameColumn(
                name: "MarkId",
                table: "VehicleModels",
                newName: "VehicleMarkId");

            migrationBuilder.RenameIndex(
                name: "IX_VehicleModels_MarkId",
                table: "VehicleModels",
                newName: "IX_VehicleModels_VehicleMarkId");

            migrationBuilder.RenameColumn(
                name: "DateCreated",
                table: "Reports",
                newName: "Date");

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Persons",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReportId",
                table: "Forms",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Forms_ReportId",
                table: "Forms",
                column: "ReportId");

            migrationBuilder.AddForeignKey(
                name: "FK_Forms_Reports_ReportId",
                table: "Forms",
                column: "ReportId",
                principalTable: "Reports",
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
    }
}
