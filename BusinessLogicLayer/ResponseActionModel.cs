using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
  public  class ResponseActionModel
    {

        public int status_Code { get; set; }
        public int Session_var { get; set; }
        public string Message { get; set; }
        public string Category { get; set; }
    }
}
