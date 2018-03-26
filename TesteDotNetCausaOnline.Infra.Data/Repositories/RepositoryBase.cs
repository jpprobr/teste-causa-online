using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Microsoft.Extensions.Configuration;


namespace TesteDotNetCausaOnline.Infra.Data.Repositories
{
    public class RepositoryBase
    {
        private const string CONNECTIONSTRING_KEY = "DefaultConnection";

        protected SqlConnection connection;


        public RepositoryBase(IConfiguration configuration)
        {
            //var connectionString = configuration.GetSection(CONNECTIONSTRING_KEY);
            var connectionString = configuration.GetConnectionString(CONNECTIONSTRING_KEY);


            if (string.IsNullOrWhiteSpace(connectionString))
                throw new ArgumentNullException("Connection string not found");

            connection = new SqlConnection(connectionString);
        }



    }
}
