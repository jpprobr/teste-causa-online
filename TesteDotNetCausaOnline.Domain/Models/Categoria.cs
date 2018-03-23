using System.Collections.Generic;

namespace TesteDotNetCausaOnline.Domain.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        
        public string Descricao { get; set; }


        public virtual ICollection<Chamado> Chamados { get; set; }
    }
}