using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class EmployeeModel
    {
        public string Personal_No { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Category { get; set; }
        public string PhotoLocation { get; set; }
        public string Password { get; set; }
        public int Status { get; set; }
        public string EmployeeId { get; set; }

        public int IsDeleted { get; set; }
    }
}
