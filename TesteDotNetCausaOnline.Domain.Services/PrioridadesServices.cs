using System;
using System.Collections.Generic;
using System.Linq;
using TesteDotNetCausaOnline.Domain.Enums;


namespace TesteDotNetCausaOnline.Domain.Services
{
    public class PrioridadesServices
    {
        public PrioridadesServices()
        {
            
        }

        public ICollection<object> BuscarPrioridades()
        {
            try
            {
                var prioridades = new List<object>();
                foreach (int i in Enum.GetValues(typeof(Prioridade)))
                {
                    var name = Enum.GetName(typeof(Prioridade), i);

                    prioridades.Add(new { Id = i, Descricao = name });
                }

                return prioridades;
            }
            catch (Exception exc)
            {
                 throw exc;
            }
        }
    }
}
