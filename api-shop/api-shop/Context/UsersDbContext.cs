using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Context
{
  public class UsersDbContext : DbContext
  {
    public UsersDbContext(DbContextOptions<UsersDbContext> options) : base(options) { }

    public DbSet<Users> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder){
      modelBuilder.Entity<Users>().ToTable("users");
    }

  }
}
