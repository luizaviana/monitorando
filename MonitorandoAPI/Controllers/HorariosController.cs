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
    public class HorariosController : Controller
    {
        private readonly MoniContext _context;
        public HorariosController(MoniContext context)
        {
            // construtor
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Horarios>> GetAll()
        {
            return _context.Horarios.ToList();
        }

        [HttpGet("{HorarioId}")]
        public ActionResult<List<Horarios>> Get(int HorarioId)
        {
            try
            {
                var result = _context.Horarios.Find(HorarioId);
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
        public async Task<ActionResult> post(Horarios model)
        {
            try
            {
                _context.Horarios.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/Horarios/{model.idHorario}", model);
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
        public async Task<IActionResult> put(int HorarioId, Horarios NewHorario)
        {
            try
            {
                //verifica se existe Horario a ser alterado
                var result = await _context.Horarios.FindAsync(HorarioId);
                if (HorarioId != result.idHorario)
                {
                    return BadRequest();
                }
                result.horario = NewHorario.horario;
                result.raAluno = NewHorario.raAluno;
                result.idMateria = NewHorario.idMateria;
                result.idMonitor = NewHorario.idMonitor;

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
                var Horarios = await _context.Horarios.FindAsync(HorarioId);
                if (Horarios == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(Horarios);
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