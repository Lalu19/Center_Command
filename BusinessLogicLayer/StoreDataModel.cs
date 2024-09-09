using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
   public class StoreDataModel
    {


        public int Sno { get; set; }
        public string UMC_No { get; set; }
        public string Item_Desc { get; set; }
        public string Part_No { get; set; }
        public string Make { get; set; }
        public string Area { get; set; }
        public int Qty { get; set; }
        public string Unit { get; set; }
        public string Location { get; set; }
        public string Sub_Location { get; set; }
        public string Min_Qty { get; set; }
        public string Category { get; set; }
        public string Remarks { get; set; }
        public DateTime Entry_Date { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

    }
}
