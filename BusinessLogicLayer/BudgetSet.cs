using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
   public class BudgetSet
    {
        public int Sno { get; set; }
        public decimal BudgetAmount { get; set; }
        public DateTime BudgetDate { get; set; }
        public decimal MaterialAmt { get; set; }
        public decimal ServiceAmt { get; set; }
    }
}
