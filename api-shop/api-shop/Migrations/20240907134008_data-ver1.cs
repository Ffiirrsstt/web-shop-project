using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api_shop.Migrations
{
    /// <inheritdoc />
    public partial class dataver1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CartDetail",
                table: "users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CartDetail",
                table: "users");
        }
    }
}
