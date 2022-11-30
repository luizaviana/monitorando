using System.ComponentModel.DataAnnotations;
namespace MonitorandoAPI.Models
{
    public class Materia
    {
        [Key]
        public int idMateria { get; set; }
        public string nome { get; set; }
    }
}