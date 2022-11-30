using System.ComponentModel.DataAnnotations;
namespace MonitorandoAPI.Models
{
    public class Monitor
    {
        [Key]
        public int idMonitor { get; set; }
        public string nome { get; set; }
        public string curso { get; set; }
        public string senha { get; set; }
        public int idMateria { get; set; }
    }
}