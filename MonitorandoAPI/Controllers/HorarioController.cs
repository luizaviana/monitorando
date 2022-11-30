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
    public class HorarioController : Controller
    {
        private readonly MoniContext _context;
        public HorarioController(MoniContext context)
        {
            // construtor
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Horario>> GetAll()
        {
            return _context.Horario.ToList();
        }

        [HttpGet("{HorarioId}")]
        public ActionResult<List<Horario>> Get(int HorarioId)
        {
            try
            {
                var result = _context.Horario.Find(HorarioId);
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
        public async Task<ActionResult> post(Horario model)
        {
            try
            {
                _context.Horario.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/Horario/{model.idHorario}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{HorarioId}")]
        public async Task<IActionResult> put(int HorarioId, Horario NewHorario)
        {
            try
            {
                //verifica se existe Horario a ser alterado
                var result = await _context.Horario.FindAsync(HorarioId);
                if (HorarioId != result.idHorario)
                {
                    return BadRequest();
                }
                result.horario = NewHorario.horario;
                result.idMateria = NewHorario.idMateria;
                result.idMonitor = NewHorario.idMonitor;
                result.idAluno = NewHorario.idAluno;

                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{HorarioId}")]
        public async Task<ActionResult> delete(int HorarioId)
        {
            try
            {
                //verifica se existe Horario a ser excluído
                var Horario = await _context.Horario.FindAsync(HorarioId);
                if (Horario == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(Horario);
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