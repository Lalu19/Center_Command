using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
   public class GiventoOthers
    {
        public int GiventoOthersId { get; set; }
        public string UMC_No { get; set; }
        public string UmcDetails { get; set; }
        public int QtyHandover { get; set; }
        public decimal Cost { get; set; }
        public decimal TotalCost { get; set; }
        public string Arealocation { get; set; }
        public string Department { get; set; }
        public string Entry_Date { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }
}
