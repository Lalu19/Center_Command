using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.ComponentModel.DataAnnotations;


namespace BusinessLogicLayer
{
   public class PPEsDataModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Email address is required")]
        public string umcno { get; set; }

        public string Item_Desc { get; set; }

      
        public string UOM { get; set; }

        
        public string Qty { get; set; }
        public string Unit_Price { get; set; }
        public string IssueDate { get; set; }
        public string Name { get; set; }
        public string EmpId { get; set; }
        public string ReservationNo { get; set; }

        //===========================================================

        
        public string[] umcno1 { get; set; }

       
        public string[] Item_Desc1 { get; set; }

     
        public string[] UOM1 { get; set; }

       
        public string[] Qty1 { get; set; }
        public string[] Unit_Price1 { get; set; }
        public string[] IssueDate1 { get; set; }
        public string[] Name1 { get; set; }
        public string[] EmpId1 { get; set; }
        public string[] ReservationNo1 { get; set; }
    }
}
