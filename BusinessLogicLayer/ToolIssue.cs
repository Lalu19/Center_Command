using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
   public class ToolIssue
    {
        public int Sno { get; set; }
        public string UMC_No { get; set; }
        public string ToolName { get; set; }
        public int ToolQty { get; set; }
        public string Location { get; set; }
        public string SubLocation { get; set; }
        public string PartNo { get; set; }
        public int IssueQty { get; set; }
        public string ReceiverId { get; set; }
        public string IssuierId { get; set; }
        public string IssueDate { get; set; }
        public int Status { get; set; }
        public DateTime DepositDate { get; set; }
        public string DepositBy { get; set; }
        public string ReceiveBy { get; set; }
        public int DepositQty { get; set; }
        public string Remarks { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Issueirtype { get; set; }
        public bool IssueAs { get; set; }
        public int EmergencyIssueQty { get; set; }
        public int EmergencyFlag { get; set; }
    }
}
