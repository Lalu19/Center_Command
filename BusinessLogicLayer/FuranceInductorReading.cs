using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
   public class FuranceInductorReading
    {
        public int FuranceInductorReadingId { get; set; }
        public int FuranceInductorReadingAId { get; set; }
        public int FuranceInductorReadingCId { get; set; }
        public DateTime DateofReading { get; set; }
        public string Power { get; set; }
        public string LineAMPS { get; set; }
        public string LinePF { get; set; }
        public string LoadAMPS { get; set; }
        public string LoadPF { get; set; }
        public string LoadVolts { get; set; }
        public string Ratio { get; set; }
        public string BushingTempG1 { get; set; }
        public string BushingTempG2 { get; set; }
        public string BushingTempG3 { get; set; }
        public string BushingTempG4 { get; set; }
        public string CurrentR { get; set; }
        public string CurrentS { get; set; }
        public string CurrentT { get; set; }
        public string POTTEMP { get; set; }
    }
}
