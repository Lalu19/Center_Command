using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
   public class MaterialCostData
    {
        public double LinePF;

        public int MaterialCostDataId { get; set; }
        public string Date { get; set; }
        public double Power { get; set; }
        public double LineAMPS { get; set; }
        public double LoadAMPS { get; set; }
    }
}
