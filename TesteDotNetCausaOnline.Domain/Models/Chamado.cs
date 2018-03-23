using System;

namespace TesteDotNetCausaOnline.Domain.Models
{
    public class Chamado
    {
        public int NumeroProcesso { get; set; }

        public int IdCategoria { get; set; }


        public string Titulo { get; set; }

        public string Mensagem { get; set; }

        public int Urgencia { get; set; }


        public virtual Categoria Categoria { get; set; }
    }
}
