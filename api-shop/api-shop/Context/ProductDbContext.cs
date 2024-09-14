using API.Model;
using api_shop.Model;
using Microsoft.EntityFrameworkCore;

namespace api_shop.Context
{
    public class ProductDbContext: DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options) { }

        public DbSet<Products> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Products>().ToTable("products");
        }

    }
}
