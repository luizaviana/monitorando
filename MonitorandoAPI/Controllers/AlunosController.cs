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
    public class AlunosController : Controller
    {
        private readonly MoniContext _context;
        public AlunosController(MoniContext context)
        {
            // construtor
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Alunos>> GetAll()
        {
            return _context.Alunos.ToList();
        }

        [HttpGet("{AlunoId}")]
        public ActionResult<List<Alunos>> Get(int AlunoId)
        {
            try
            {
                var result = _context.Alunos.Find(AlunoId);
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
        public async Task<ActionResult> post(Alunos model)
        {
            try
            {
                _context.Alunos.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/aluno/{model.ra}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{AlunoId}")]
        public async Task<IActionResult> put(int AlunoId, Alunos dadosAlunoAlt)
        {
            try
            {
                //verifica se existe aluno a ser alterado
                var result = await _context.Alunos.FindAsync(AlunoId);
                if (AlunoId != result.idAluno)
                {
                    return BadRequest();
                }
                //_context.Entry(dadosAlunoAlt).State = EntityState.Modified;
                result.ra = dadosAlunoAlt.ra;
                result.nome = dadosAlunoAlt.nome;
                result.curso = dadosAlunoAlt.curso;
                result.senha = dadosAlunoAlt.senha;
                await _context.SaveChangesAsync();
                //return NoContent();
                return Created($"/api/aluno/{dadosAlunoAlt.ra}", dadosAlunoAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acessoao banco de dados.");
            }
        }

        [HttpDelete("{AlunoId}")]
        public async Task<ActionResult> delete(int AlunoId)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var aluno = await _context.Alunos.FindAsync(AlunoId);
                if (aluno == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(aluno);
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