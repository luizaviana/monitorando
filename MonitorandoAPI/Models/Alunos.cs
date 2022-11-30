using System.ComponentModel.DataAnnotations;
namespace MonitorandoAPI.Models

{
    public class Alunos
    {
        [Key]
        public int idAluno { get; set; }
        public string ra { get; set; }
        public string nome { get; set; }
        public string curso { get; set; }
        public string senha { get; set; }
    }
}