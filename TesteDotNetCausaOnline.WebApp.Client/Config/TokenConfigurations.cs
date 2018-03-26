using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TesteDotNetCausaOnline.WebApp.Config
{
    public class TokenConfigurations
    {
        /// <summary>
        /// Audience
        /// </summary>
        public string Audience { get; set; }

        /// <summary>
        /// Emissor
        /// </summary>
        public string Issuer { get; set; }

        /// <summary>
        /// Tempo de validade em segundos
        /// </summary>
        public int Seconds { get; set; }
    }
}
