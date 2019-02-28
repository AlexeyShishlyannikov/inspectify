using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class Removedphonenumberfrominvitationtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Invitations");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Invitations",
                nullable: false,
                defaultValue: "");
        }
    }
}
