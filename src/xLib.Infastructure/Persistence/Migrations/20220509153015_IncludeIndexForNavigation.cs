using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace xLib.Infastructure.Persistence.Migrations
{
    public partial class IncludeIndexForNavigation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateSequence<int>(
                name: "IndexNumbers");

            migrationBuilder.AddColumn<int>(
                name: "Index",
                table: "NavigationItems",
                type: "integer",
                nullable: false,
                defaultValueSql: "nextval('\"IndexNumbers\"')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropSequence(
                name: "IndexNumbers");

            migrationBuilder.DropColumn(
                name: "Index",
                table: "NavigationItems");
        }
    }
}
