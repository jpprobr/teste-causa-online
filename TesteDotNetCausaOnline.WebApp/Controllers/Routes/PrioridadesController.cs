using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using TesteDotNetCausaOnline.Domain.Enums;


namespace TesteDotNetCausaOnline.WebApp.Controllers.Routes
{
    [Produces("application/json")]
    [Route("api/Prioridades")]
    public class PrioridadesController : Controller
    {
        // GET: api/prioridades
        [HttpGet]
        public IActionResult GetPrioridades()
        {
            var prioridades = new List<object>();
            foreach (int i in Enum.GetValues(typeof(Prioridade)))
            {
                var name = Enum.GetName(typeof(Prioridade), i);

                prioridades.Add(new { Id = i, Descricao = name });
            }

            return Ok(prioridades);
        }
    }
}