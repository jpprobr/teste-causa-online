using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TesteDotNetCausaOnline.Domain.Models;
using TesteDotNetCausaOnline.WebApp.Data;

namespace TesteDotNetCausaOnline.WebApp.Controllers.Routes
{
    [Produces("application/json")]
    [Route("api/Chamados")]
    public class ChamadosController : Controller
    {
        private readonly ApplicationDbContext _context;


        public ChamadosController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: api/Chamados
        [HttpGet]
        public IEnumerable<Chamado> GetChamados()
        {
            return _context.Chamados;
        }

        // GET: api/Chamados/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChamado([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var chamado = await _context.Chamados.SingleOrDefaultAsync(m => m.NumeroProcesso == id);

            if (chamado == null)
            {
                return NotFound();
            }

            return Ok(chamado);
        }

        // PUT: api/Chamados/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChamado([FromRoute] int id, [FromBody] Chamado chamado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != chamado.NumeroProcesso)
            {
                return BadRequest();
            }

            _context.Entry(chamado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChamadoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Chamados
        [HttpPost]
        public async Task<IActionResult> PostChamado([FromBody] Chamado chamado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Chamados.Add(chamado);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChamado", new { id = chamado.NumeroProcesso }, chamado);
        }

        // DELETE: api/Chamados/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChamado([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var chamado = await _context.Chamados.SingleOrDefaultAsync(m => m.NumeroProcesso == id);
            if (chamado == null)
            {
                return NotFound();
            }

            _context.Chamados.Remove(chamado);
            await _context.SaveChangesAsync();

            return Ok(chamado);
        }

        private bool ChamadoExists(int id)
        {
            return _context.Chamados.Any(e => e.NumeroProcesso == id);
        }
    }
}