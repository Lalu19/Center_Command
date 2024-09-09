using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
   public class FuranceInductorGraph
    {
        
        public int FuranceInductorGraphId { get; set; }
        public string Date { get; set; }
        public double Power { get; set; }
        public double LineAMPS { get; set; }
        public double LoadAMPS { get; set; }
        public double LinePF { get; set; }
        public double LoadPF { get; set; }   
        public double LoadVolts { get; set; }
        public double Ratio { get; set; }    
        public string fromDate { get; set; }
        public string toDate { get; set; }
    }
}
