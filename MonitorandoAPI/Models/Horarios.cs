using System.ComponentModel.DataAnnotations;
namespace MonitorandoAPI.Models
{
    public class Horarios
    {
        [Key]
        public int idHorario { get; set; }
        public System.DateTime horario { get; set; }
        public string raAluno { get; set; }
        public int idMateria { get; set; }
        public int idMonitor { get; set; }


    }
}