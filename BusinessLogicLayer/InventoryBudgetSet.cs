using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class InventoryBudgetSet
    {
        public int Sno { get; set; }
        public decimal ActualInventoryCost { get; set; }
        public decimal FixedInventoryCost { get; set; }
        public DateTime BudgetDate { get; set; }
      
    }
}
