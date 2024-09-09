using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
   public class MaterialIssueModel
    {
        public int Sno { get; set; }
        public string Reservation_No { get; set; }
        public string Item_Desc { get; set; }
        public string UMC_No { get; set; }
        public string New_UMC { get; set; }
        public string Part_No { get; set; }
        public int Issue_Qty { get; set; }
        public int Total_Qty { get; set; }
        public string UNIT { get; set; }
        public string IssueirId { get; set; }
        public string Issueirname { get; set; }
        public string ReceiverId { get; set; }
        public string Receivername { get; set; }
        public string Remarks { get; set; }
        public DateTime Issue_Date { get; set; }
        public DateTime EntryDate { get; set; }
        public string Plant_Location { get; set; }
        public string MO_No { get; set; }

        public int TempData { get; set; }

        public string Make { get; set; }
        public string Area { get; set; }
        public string PartNo { get; set; }
        public string Location { get; set; }
        public string Sub_Location { get; set; }
        public string Category { get; set; }
        public int Qty { get; set; }

        //new class for  new issuematerial insert
        public string[] ItemDesc1 { get; set; }
        public string[] umcno1 { get; set; }
        public string[] partno1 { get; set; }
        public string[] unit1 { get; set; }
        public decimal[] avlqty1 { get; set; }
        public decimal[] issueqty1 { get; set; }
        public string[] remarks1 { get; set; }
        public string[] location1 { get; set; }
        public string[] sublocation1 { get; set; }



    }
}
