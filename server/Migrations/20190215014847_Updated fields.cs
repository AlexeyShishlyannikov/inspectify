using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class Updatedfields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormInputs_Forms_FormId",
                table: "FormInputs");

            migrationBuilder.DropForeignKey(
                name: "FK_Persons_Teams_TeamId",
                table: "Persons");

            migrationBuilder.DropIndex(
                name: "IX_Persons_TeamId",
                table: "Persons");

            migrationBuilder.DropIndex(
                name: "IX_FormInputs_FormId",
                table: "FormInputs");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "FormId",
                table: "FormInputs");

            migrationBuilder.RenameColumn(
                name: "CompanyLogoUrl",
                table: "Companies",
                newName: "LogoUrl");

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Forms",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsArchived",
                table: "Forms",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated",
                table: "Forms",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "FormInputs",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Persons_CompanyId",
                table: "Persons",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_Companies_CompanyId",
                table: "Persons",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Persons_Companies_CompanyId",
                table: "Persons");

            migrationBuilder.DropIndex(
                name: "IX_Persons_CompanyId",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Forms");

            migrationBuilder.DropColumn(
                name: "IsArchived",
                table: "Forms");

            migrationBuilder.DropColumn(
                name: "Updated",
                table: "Forms");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "FormInputs");

            migrationBuilder.RenameColumn(
                name: "LogoUrl",
                table: "Companies",
                newName: "CompanyLogoUrl");

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "Persons",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FormId",
                table: "FormInputs",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Persons_TeamId",
                table: "Persons",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_FormInputs_FormId",
                table: "FormInputs",
                column: "FormId");

            migrationBuilder.AddForeignKey(
                name: "FK_FormInputs_Forms_FormId",
                table: "FormInputs",
                column: "FormId",
                principalTable: "Forms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_Teams_TeamId",
                table: "Persons",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
