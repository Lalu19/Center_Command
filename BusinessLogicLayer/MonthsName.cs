using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
   public class MonthsName
    {
        public int id { get; set; }
        public int monthno { get; set; }
        public string monthname { get; set; }
        public string year { get; set; }

        public string monthlyRealdata { get; set; }
        public string MonthlyBudgetPlan { get; set; }
        public string ActualMaterial { get; set; }
        public string ActualService { get; set; }
    }
}
