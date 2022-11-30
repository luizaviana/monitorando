using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MonitorandoAPI.Models;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using MonitorandoAPI.Services;
using MonitorandoAPI.Data;
namespace MonitorandoAPI.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private readonly MoniContext _context;
        public HomeController(MoniContext context)
        {
            // construtor
            _context = context;
        }
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] Alunos alunos)
        {
            //verifica se existe aluno a ser excluído
            var aluno = _context.Alunos
            .Where(a => a.ra == alunos.ra && a.senha == alunos.senha)
            .FirstOrDefault();
            if (aluno == null)
                return NotFound(new { message = "Usuário ou senha inválidos" });
            var token = TokenService.GenerateToken(aluno);
            aluno.senha = "";
            return new
            {
                aluno = aluno,
                token = token
            };
        }
    }
}