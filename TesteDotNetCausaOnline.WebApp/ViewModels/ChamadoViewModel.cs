using System;
using TesteDotNetCausaOnline.Domain.Enums;


namespace TesteDotNetCausaOnline.WebApp.ViewModels
{
    public class ChamadoViewModel
    {
        private PrioridadeViewModel _prioridade;


        public ChamadoViewModel()
        {
            _prioridade = new PrioridadeViewModel();
        }


        public int NumeroProcesso { get; set; }

        public int IdCategoria { get; set; }


        public string Titulo { get; set; }

        public string Mensagem { get; set; }

        public int Urgencia { get; set; }

        /// <summary>
        /// Propriedade usada p/ receber e montar objeto com a prioridade correspondente ao chamado (temp. evitar criação de tabela)
        /// </summary>
        public virtual PrioridadeViewModel Prioridade
        {
            get
            {
                switch ((Prioridade)Enum.Parse(typeof(Prioridade), Urgencia.ToString()))
                {
                    case Domain.Enums.Prioridade.Baixa:
                        _prioridade = new PrioridadeViewModel { Id = Urgencia, Descricao = "Baixa" };
                        break;
                    case Domain.Enums.Prioridade.Media: 
                        _prioridade = new PrioridadeViewModel { Id = Urgencia, Descricao = "Média" };
                        break;
                    case Domain.Enums.Prioridade.Alta:
                        _prioridade = new PrioridadeViewModel { Id = Urgencia, Descricao = "Alta" };
                        break;
                    default:
                        break;
                }

                return _prioridade;
            }
        }

        /// <summary>
        /// Propriedade p/ receber categoria correspondente ao chamado
        /// </summary>
        public virtual CategoriaViewModel Categoria { get; set; }
    }
}