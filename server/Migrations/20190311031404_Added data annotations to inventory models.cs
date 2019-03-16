using Microsoft.EntityFrameworkCore.Migrations;

namespace Inspectify.Migrations
{
    public partial class Addeddataannotationstoinventorymodels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemValues_Items_ItemId",
                table: "ItemValues");

            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Templates_TemplateId",
                table: "Properties");

            migrationBuilder.AlterColumn<string>(
                name: "TemplateId",
                table: "Properties",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "type",
                table: "Properties",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "ItemId",
                table: "ItemValues",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemValues_Items_ItemId",
                table: "ItemValues",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Templates_TemplateId",
                table: "Properties",
                column: "TemplateId",
                principalTable: "Templates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemValues_Items_ItemId",
                table: "ItemValues");

            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Templates_TemplateId",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "type",
                table: "Properties");

            migrationBuilder.AlterColumn<string>(
                name: "TemplateId",
                table: "Properties",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "ItemId",
                table: "ItemValues",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddForeignKey(
                name: "FK_ItemValues_Items_ItemId",
                table: "ItemValues",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Templates_TemplateId",
                table: "Properties",
                column: "TemplateId",
                principalTable: "Templates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
