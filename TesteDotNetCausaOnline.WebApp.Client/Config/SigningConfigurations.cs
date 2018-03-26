using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;


namespace TesteDotNetCausaOnline.WebApp.Config
{
    public class SigningConfigurations
    {
        /// <summary>
        /// Conterá a chave de criptografia usada na criação de tokens
        /// </summary>
        public SecurityKey Key { get; }

        /// <summary>
        ///  Conterá a chave de criptografia e o algoritmo de segurança empregados na geração de assinaturas digitais para tokens
        /// </summary>
        public SigningCredentials SigningCredentials { get; }


        /// <summary>
        /// Construtor inicializa as propriedades (Uso do padrão RSA como algoritmo de criptgrafia)
        /// </summary>
        public SigningConfigurations()
        {
            using (var provider = new RSACryptoServiceProvider(2048))
            {
                Key = new RsaSecurityKey(provider.ExportParameters(true));
            }

            //SigningCredentials = new SigningCredentials(Key, SecurityAlgorithms.RsaSha256Signature);
            SigningCredentials = new SigningCredentials(Key, SecurityAlgorithms.RsaSha512Signature);
        }        
    }
}
