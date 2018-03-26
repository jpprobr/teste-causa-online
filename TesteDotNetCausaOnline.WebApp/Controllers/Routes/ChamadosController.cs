using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using TesteDotNetCausaOnline.Domain.Models;
using TesteDotNetCausaOnline.WebApp.Data;
using TesteDotNetCausaOnline.WebApp.ViewModels;


namespace TesteDotNetCausaOnline.WebApp.Controllers.Routes
{
    [Authorize("Bearer")]
    [Produces("application/json")]
    [Route("api/chamados")]
    public class ChamadosController : Controller
    {
        private readonly ApplicationDbContext _context;
        private IMapper _mapper;


        public ChamadosController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        // GET:/ api/chamados
        /// <summary>
        /// Busca chamados
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetChamados()
        {
            try
            {
                var chamados = _context.Chamados
                                        .Include(c => c.Categoria)
                                        .ToList();

                var itensViewModel = _mapper.Map<List<ChamadoViewModel>>(chamados);

                return Ok(itensViewModel);
            }
            catch (Exception exc)
            {
                var resp = new { info = "Não foi possível buscar chamados.", exc };

                return BadRequest(resp);
            }
        }

        // GET: /api/chamados/{id}
        /// <summary>
        /// Busca Chamado por Id (Número do processo)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChamado([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var chamado = await _context.Chamados
                                            .Include(c => c.Categoria)
                                            .SingleOrDefaultAsync(m => m.NumeroProcesso == id);

                if (chamado == null)
                    return NotFound();

                var itemViewModel = _mapper.Map<ChamadoViewModel>(chamado);

                return Ok(itemViewModel);
            }
            catch (Exception exc)
            {
                var resp = new { info = "Não foi possível buscar chamado por Nº do Processo.", exc };

                return BadRequest(resp);
            }
        }

        // POST: /api/chamados
        /// <summary>
        /// Insere chamado
        /// </summary>
        /// <param name="chamado"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> PostChamado([FromBody] Chamado chamado)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                chamado.NumeroProcesso = 0;
                chamado.IdCategoria = chamado.Categoria.Id;
                chamado.Categoria = null;

                _context.Chamados.Add(chamado);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetChamado", new { id = chamado.NumeroProcesso }, chamado);
            }
            catch (Exception exc)
            {
                var resp = new { info = "Não foi possível inserir o chamado.", exc };

                return BadRequest(resp);
            }
        }

        // PUT: /api/chamados/{id}
        /// <summary>
        /// Atualiza chamado
        /// </summary>
        /// <param name="id"></param>
        /// <param name="chamado"></param>
        /// <returns></returns>
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

        // DELETE: /api/chamados/{id}
        /// <summary>
        /// Exclui o chamado
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChamado([FromRoute] int id)
        {
            try
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
            catch (Exception exc)
            {
                var resp = new { info = "Não foi possível excluir o chamado.", exc };

                return BadRequest(resp);
            }
        }


        private bool ChamadoExists(int id)
        {
            return _context.Chamados.Any(e => e.NumeroProcesso == id);
        }
    }
}