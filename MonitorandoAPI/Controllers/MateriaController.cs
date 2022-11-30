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
    public class MateriaController : Controller
    {
        private readonly MoniContext _context;
        public MateriaController(MoniContext context)
        {
            // construtor
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Materia>> GetAll()
        {
            return _context.Materia.ToList();
        }

        [HttpGet("{MateriaId}")]
        public ActionResult<List<Materia>> Get(int MateriaId)
        {
            try
            {
                var result = _context.Materia.Find(MateriaId);
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
        public async Task<ActionResult> post(Materia model)
        {
            try
            {
                _context.Materia.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/Materia/{model.idMateria}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{MateriaId}")]
        public async Task<IActionResult> put(int MateriaId, Materia NewMateria)
        {
            try
            {
                //verifica se existe Materia a ser alterado
                var result = await _context.Materia.FindAsync(MateriaId);
                if (MateriaId != result.idMateria)
                {
                    return BadRequest();
                }
                result.nome = NewMateria.nome;

                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{MateriaId}")]
        public async Task<ActionResult> delete(int MateriaId)
        {
            try
            {
                //verifica se existe Materia a ser excluído
                var Materia = await _context.Materia.FindAsync(MateriaId);
                if (Materia == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(Materia);
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