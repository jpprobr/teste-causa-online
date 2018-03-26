using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using TesteDotNetCausaOnline.Domain.Models;
using TesteDotNetCausaOnline.WebApp.Data;


namespace TesteDotNetCausaOnline.WebApp.Controllers.Routes
{
    [Authorize("Bearer")]
    [Produces("application/json")]
    [Route("api/categorias")]
    public class CategoriasController : Controller
    {
        private readonly ApplicationDbContext _context;


        public CategoriasController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: /api/categorias
        /// <summary>
        /// Busca categorias
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Categoria> GetCategorias()
        {
            return _context.Categorias;
        }

        // GET: /api/categorias/{id}
        /// <summary>
        /// Busca Categoria por Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoria([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var categoria = await _context.Categorias.SingleOrDefaultAsync(m => m.Id == id);

            if (categoria == null)
            {
                return NotFound();
            }

            return Ok(categoria);
        }

        // PUT: /api/categorias/{id}
        /// <summary>
        /// Atualiza Categoria
        /// </summary>
        /// <param name="id"></param>
        /// <param name="categoria"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoria([FromRoute] int id, [FromBody] Categoria categoria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != categoria.Id)
            {
                return BadRequest();
            }

            _context.Entry(categoria).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoriaExists(id))
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

        // POST: /api/categorias
        /// <summary>
        /// Insere Categoria
        /// </summary>
        /// <param name="categoria"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> PostCategoria([FromBody] Categoria categoria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategoria", new { id = categoria.Id }, categoria);
        }

        // DELETE: /api/categorias/{id}
        /// <summary>
        /// Excluir categoria
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria([FromRoute] int id)
        {            
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var categoria = await _context.Categorias
                                                .Include(c => c.Chamados)
                                                .SingleOrDefaultAsync(m => m.Id == id);
                if (categoria == null)
                    return NotFound();

                // Verifica se há chamados associados
                if (categoria.Chamados != null && categoria.Chamados.Count > 0)
                    throw new Exception("A categoria possui chamados associados e não pode ser removida no momento.");

                _context.Categorias.Remove(categoria);
                await _context.SaveChangesAsync();

                return Ok(categoria);
            }
            catch (Exception exc)
            {
                var resp = new { info = "Não foi possível inserir a categoria.", exc };

                return BadRequest(resp);
            }
        }


        private bool CategoriaExists(int id)
        {
            return _context.Categorias.Any(e => e.Id == id);
        }
    }
}