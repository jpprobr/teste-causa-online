using System;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Dapper;

using TesteDotNetCausaOnline.Domain.Models;


namespace TesteDotNetCausaOnline.Infra.Data.Repositories
{
    public class ChamadosRepository : RepositoryBase
    {
        public ChamadosRepository(IConfiguration configuration) : base(configuration)
        {
        }


        public bool InserirSQL(Chamado chamado)
        {
            try
            {
                connection.Execute(@"INSERT [dbo].[Chamados]
                                    ([IdCategoria],[Titulo], [Mensagem],,[Urgencia])
                                        VALUES (@IdCategoria, @Titulo, @Mensagem, @Urgencia)", chamado);

                return true;
            }
            catch (Exception exc)
            {
                throw exc;
            }
        }
    }
}
