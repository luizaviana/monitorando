using Microsoft.EntityFrameworkCore;
using MonitorandoAPI.Models;

namespace MonitorandoAPI.Data
{
    public class MoniContext : DbContext
    {
        public MoniContext(DbContextOptions<MoniContext> options) : base(options)
        {
        }
        public DbSet<Monitor> Monitor { get; set; }
        public DbSet<Horarios> Horarios { get; set; }
        public DbSet<Materia> Materia {get; set;}
    }
}