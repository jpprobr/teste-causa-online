using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TesteDotNetCausaOnline.Domain.Models;
using TesteDotNetCausaOnline.WebApp.Models;

namespace TesteDotNetCausaOnline.WebApp.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Chamado> Chamados { get; set; }

        public DbSet<Categoria> Categorias { get; set; }



        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Chamado>().HasKey(c => c.NumeroProcesso);
            builder.Entity<Categoria>().HasKey(c => c.Id);

            builder.Entity<Chamado>()
                .HasOne(c => c.Categoria)
                .WithMany(c => c.Chamados)
                .HasForeignKey(c => c.IdCategoria);


            base.OnModelCreating(builder);
        }
    }
}
