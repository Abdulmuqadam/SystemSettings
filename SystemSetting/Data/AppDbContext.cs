using Microsoft.EntityFrameworkCore;
using SystemSetting.Models;

namespace SystemSetting.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<SystemSettings> SystemSettings { get; set; }
    }
}
