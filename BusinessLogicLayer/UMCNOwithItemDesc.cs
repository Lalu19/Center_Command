using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class UMCNOwithItemDesc
    {
        public int UMCNowithItemdescId { get; set; }
        public string UMCNo { get; set; }
        public string Itemdesc { get; set; }
        public int IsDeleted { get; set; }

        public string[] UMCNo1 { get; set; }
        public string[] Itemdesc1 { get; set; }
    }
}
