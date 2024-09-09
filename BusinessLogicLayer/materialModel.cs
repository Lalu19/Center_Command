using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
   public class materialModel
    {
        public float Sno { get; set; }
        public string Reservation_No { get; set; }
        public string Item_Desc { get; set; }
        public string UMC_No { get; set; }
        public string New_UMC { get; set; }
        public float Reservation_Qty { get; set; }
        public int Qty_Receive { get; set; }
        public float Total_Qty { get; set; }
        public string UNIT { get; set; }
        public string Requester_Name { get; set; }
        public DateTime Receive_Date { get; set; }
        public string Remarks { get; set; }
        public string Equipment { get; set; }
        public DateTime Entry_Date { get; set; }

        public bool CentralStore_Item { get; set; }

        public int TempData { get; set; }

        public string Make { get; set; }
        public string Area { get; set; }
        public string PartNo { get; set; }
        public string Location { get; set; }
        public string SubLocation { get; set; }
        public string Category { get; set; }
        public int Qty {get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal HiddenTotalPrice { get; set; }
        public decimal Oldtotalpricevalue { get; set; }
        public int EmergencyIssueQty { get; set; }

        public string IssueAs { get; set; }
        public int MinQty { get; set; }
        public string IssuierId { get; set; }

        public string VendorName { get; set; }
        public string ServiceType { get; set; }
        public decimal ServiceCost { get; set; }
        public string ServiceMonth { get; set; }
        public string UOM { get; set; }
        public int IssueQty { get; set; }
        public string ReceiverId { get; set; }
        public DateTime IssueDate { get; set; }

        //ServiceEntry
        public DateTime Fromlength { get; set; }
        public DateTime Tolength { get; set; }
        public string Usc { get; set; }
        public string UscDetails { get; set; }
        public string ARC_No { get; set; }
        public decimal Unit3 { get; set; }
        public decimal Price3 { get; set; }
        public string Remarks3 { get; set; }

        //For barcode
        public string ID { get; set; }
        public string BarcodeID { get; set; }

        public string MaterialNotAvl { get; set; }
        //=================================class for array type================
        public string[] UMCNO1 { get; set; }

        public string[] Item_Desc1 { get; set; }
        public string[] UOM1 { get; set; }
        public string[] IssueQty1 { get; set; }
        public string[] ReceiverId1 { get; set; }
        public string[] IssueierId1 { get; set; }
        public DateTime[] IssueDate1 { get; set; }
        //=====================material entry class
        public string[] Reservation_Qty1 { get; set; }
        public string[] Qty_Receive1 { get; set; }
        public string[] Unit_Price1 { get; set; }
        public string[] Reservation_No1 { get; set; }
        public string[] Requester_Name1 { get; set; }
        public string[] Area1 { get; set; }
        public string[] Location1 { get; set; }
        public string[] Sub_Location1 { get; set; }
        public string[] Category1 { get; set; }
        public DateTime[] Entry_Date1 { get; set; }
        public string[] Total_Qty1 { get; set; }
        public string[] Total_Price1 { get; set; }
        public DateTime[] Receive_Date1 { get; set; }
        public string[] Remarks1 { get; set; }
        public string[] Make1 { get; set; }
        public string[] MinQty1 { get; set; }
        public string[] BarcodeID1 { get; set; }

        public decimal MaterialAmt { get; set; }
        public decimal ServiceAmt { get; set; }

        public string Entry_Date2 { get; set; }

        public string[] Plant { get; set; }
        public string[] Material { get; set; }
        public string[] Storage_location { get; set; }
        public string[] Val_stock { get; set; }
        public string[] ValStckVal { get; set; }
        public string[] ValStckValue { get; set; }

        //For Service bulk upload
        public string[] Usc7 { get; set; }
        public string[] UscDetails7 { get; set; }
        public string[] ARC_No7 { get; set; }
        public string[] VendorName7 { get; set; }
        public string[] ServiceType7 { get; set; }
        public string[] Unit7 { get; set; }
        public string[] Price7 { get; set; }
        public string[] ServiceCost7 { get; set; }
        public DateTime[] Fromlength7 { get; set; }
        public DateTime[] Tolength7 { get; set; }
        public DateTime[] EntryDate7 { get; set; }
        public string[] Remarks7 { get; set; }

        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }
}
