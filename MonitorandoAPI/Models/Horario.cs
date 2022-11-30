using System.ComponentModel.DataAnnotations;
namespace MonitorandoAPI.Models
{
    public class Horario
    {
        [Key]
        public int idHorario { get; set; }
        public System.DateTime horario { get; set; }
        public int idMateria { get; set; }
        public int idMonitor { get; set; }
        public int idAluno { get; set; }


    }
}