using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MonitorandoAPI.Data;
using MonitorandoAPI.Models;

namespace MonitorandoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonitorController : Controller
    {
        private readonly MoniContext _context;
        public MonitorController(MoniContext context)
        {
            // construtor
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Monitor>> GetAll()
        {
            return _context.Monitor.ToList();
        }

        [HttpGet("{MonitorId}")]
        public ActionResult<List<Monitor>> Get(int MonitorId)
        {
            try
            {
                var result = _context.Monitor.Find(MonitorId);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Monitor model)
        {
            try
            {
                _context.Monitor.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/Monitor/{model.nome}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{MonitorId}")]
        public async Task<IActionResult> put(int MonitorId, Monitor dadosMonitorAlt)
        {
            try
            {
                //verifica se existe Monitor a ser alterado
                var result = await _context.Monitor.FindAsync(MonitorId);
                if (MonitorId != result.idMonitor)
                {
                    return BadRequest();
                }
                //_context.Entry(dadosMonitorAlt).State = EntityState.Modified;
                result.nome = dadosMonitorAlt.nome;
                result.curso = dadosMonitorAlt.curso;
                result.senha = dadosMonitorAlt.senha;
                result.idMateria = dadosMonitorAlt.idMateria;
                await _context.SaveChangesAsync();
                //return NoContent();
                return Created($"/api/Monitor/{dadosMonitorAlt.nome}", dadosMonitorAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acessoao banco de dados.");
            }
        }

        [HttpDelete("{MonitorId}")]
        public async Task<ActionResult> delete(int MonitorId)
        {
            try
            {
                //verifica se existe Monitor a ser excluído
                var Monitor = await _context.Monitor.FindAsync(MonitorId);
                if (Monitor == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(Monitor);
                await _context.SaveChangesAsync();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu deletar
            return BadRequest();
        }
    }
}