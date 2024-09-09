using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using System.Configuration;
using Newtonsoft.Json;
using BusinessLogicLayer;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using System.Text;
using System.Web.Helpers;
using System.Web;
using System.Data;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Web.Http.Dispatcher;
using System.CodeDom;
using System.Web.UI;
using System.Web.UI.WebControls;
using ZXing;

using System.ComponentModel.DataAnnotations;
using System.Drawing;
using ZXing.Rendering;
//using Outlook = Microsoft.Office.Interop.Outlook;
//using Office = Microsoft.Office.Core;
//using Microsoft.Office.Interop.Outlook;

namespace Inventory_Proj_2.Controllers
{
    public class InventoryApiController : ApiController
    {
        // GET api/values


        //database code with all backend code
        //connection string
        string constr = ConfigurationManager.ConnectionStrings["dbcon"].ConnectionString;

        public object ScriptManager { get; private set; }

        //======================================================================================================================================================
        //login page source code
        [HttpPost]
        [Route("api/Inventory/Login")]
        public IHttpActionResult PostLoginData(EmployeeModel Objlog)
        {
            string Message = "Login SuccessFull";
            int statusCode = 1;
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                string username = Objlog.Personal_No;
                string Password = Objlog.Password;
                //string Category = Objlog.Category;
                SqlCommand cmd = new SqlCommand("select * from Employee where Personal_No='" + username + "' and Password='" + Password + "' and Status=1", con);

                SqlDataAdapter adp = new SqlDataAdapter(cmd);
                DataTable ds = new DataTable();
                adp.Fill(ds);

                var jsresponse = JsonConvert.SerializeObject(ds);
                //SqlDataReader dr = cmd.ExecuteReader();
                if (ds != null)
                {

                    //ResponseActionModel log = new ResponseActionModel();
                    //log.Session_var = Objlog.Personal_No;
                    //log.Category = Objlog.Category;
                    //log.status_Code = statusCode;
                    //log.Message = Message;
                    //var jsresponse = JsonConvert.SerializeObject(log);

                    return Json(jsresponse);
                }
                else
                {
                    ResponseActionModel log = new ResponseActionModel();

                    log.status_Code = 2;
                    log.Message = "Invalid...! UserName or Password";
                    jsresponse = JsonConvert.SerializeObject(log);

                    return Json(jsresponse);
                }
            }
        }
        //======================================================================================================================================================
        //insert employee data
        [Route("api/Inventory/InsertEmployee")]
        public bool PostInsertEmployee(EmployeeModel objemp)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();

                SqlCommand checkcmd = new SqlCommand("select count(1) from Employee where Personal_No = @Personal_No", con);
                checkcmd.Parameters.Add(new SqlParameter("@Personal_No", SqlDbType.VarChar)).Value = objemp.EmployeeId;
                int count = (int)checkcmd.ExecuteScalar();
                if (count > 0)
                {
                    return false;
                }

                SqlCommand cmd = new SqlCommand("sp_InsertEmployee", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar).Value = objemp.Name;
                cmd.Parameters.Add("@Personal_No", SqlDbType.VarChar).Value = objemp.EmployeeId;
                cmd.Parameters.Add("@Mobile", SqlDbType.VarChar).Value = objemp.Mobile;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar).Value = objemp.Email;
                cmd.Parameters.Add("@Category", SqlDbType.NVarChar).Value = objemp.Category;
                cmd.Parameters.Add("@Photo_Location", SqlDbType.NVarChar).Value = objemp.PhotoLocation;
                cmd.Parameters.Add("@Status", SqlDbType.Int).Value = 0;
                cmd.Parameters.Add("@Password", SqlDbType.VarChar).Value = objemp.Password;

                int x = cmd.ExecuteNonQuery();
                if (x > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
        }
        //bind all employee data
        [Route("api/Inventory/BindAllEmployee")]
        public IHttpActionResult PostAllEmployee()
        {
            using (SqlConnection con = new SqlConnection(constr))

            {
                con.Open();
                //string query = "select * from tbl_clinic_master where entry_by ='" + objmod.DocEmail + "' Order by id DESC";
                SqlCommand cmd = new SqlCommand("select * from Employee order by id desc", con);
                SqlDataAdapter adp = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                adp.Fill(dt);
                var jsondata = JsonConvert.SerializeObject(dt);
                return Json(jsondata);

            }
        }

        [Route("api/Inventory/UpdateEmployeeDetails")]
        public IHttpActionResult PostUpdateEmployeeDetails(EmployeeModel model)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("UPDATE Employee SET Name = @Name, Password = @Password, Category = @Category , Email = @Email , Mobile = @Mobile  WHERE Personal_No = @Personal_No", con);
                cmd.Parameters.AddWithValue("@Name", model.Name);
                cmd.Parameters.AddWithValue("@Password", model.Password);
                cmd.Parameters.AddWithValue("@Category", model.Category);
                cmd.Parameters.AddWithValue("@Personal_No", model.Personal_No);
                cmd.Parameters.AddWithValue("@Email", model.Email);
                cmd.Parameters.AddWithValue("@Mobile", model.Mobile);

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    return Ok("Employee details updated successfully");
                }
                else
                {
                    return BadRequest("No changes were made to the employee details");
                }
            }
        }

        //Delete Emp Code
        [Route("api/Inventory/DeleteEmployeeCode")]
        public bool PostDeleteEmployeeee(EmpCodewithEmpName objemp)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();

                string query = "Update EmployeeCodewisename set IsDeleted = 1 where EmployeeCode ='" + objemp.EmployeeCode + "'";

                SqlCommand cmd = new SqlCommand(query, con);
                int i = cmd.ExecuteNonQuery();

                if (i > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        //approve employee data
        [Route("api/Inventory/ApproveEMployee")]
        public bool PostApproveEMployee(EmployeeModel objemp)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                //sts = 1 forapprove
                //sts =0 = for reject
                string query = "";
                int sts = objemp.Status;
                if (sts == 1)
                {
                    query = "Update Employee set Status=1, Category='Normal' where Personal_No='" + objemp.Personal_No + "'";

                }
                else if (sts == 0)
                {
                    query = "Update Employee set Status=2 where Personal_No='" + objemp.Personal_No + "'";

                }
                SqlCommand cmd = new SqlCommand(query, con);
                int i = cmd.ExecuteNonQuery();
                if (i > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        //======================================================================================================================================================
      
        public class Demo
        {
            public string  data { get; set; }
        }
        //Add UMCNO with ItemDesc
        [Route("api/Inventory/SetUMCnowithItemDesc")]
        public bool PostSetUMCnowithItemDesc(UMCNOwithItemDesc objbud)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();

                SqlCommand checkcmd = new SqlCommand("SELECT COUNT(1) FROM UMCNowithItemdesc WHERE UMCNo = @UMCNo", con);
                checkcmd.Parameters.AddWithValue("@UMCNo", objbud.UMCNo);

                int count = (int)checkcmd.ExecuteScalar();
                if (count > 0)
                {
                    return false;
                }

                SqlCommand cmd = new SqlCommand("INSERT INTO UMCNowithItemdesc (UMCNo, Itemdesc) VALUES (@UMCNo, @Itemdesc)", con);
                cmd.Parameters.AddWithValue("@UMCNo", objbud.UMCNo);
                cmd.Parameters.AddWithValue("@Itemdesc", objbud.Itemdesc);

                int i = cmd.ExecuteNonQuery();
                if (i > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        //bind all UMCno data
        [Route("api/Inventory/AllUMCNoData")]
        public IHttpActionResult PostAllUMCNoData()
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("select * from UMCNowithItemdesc", con);
                SqlDataAdapter adp = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                adp.Fill(dt);
                var jsondata = JsonConvert.SerializeObject(dt);
                return Json(jsondata);

            }
        }
        //insert bulk UMC data  
        [Route("api/Inventory/UploadUMCBulkMaterial")]
        public IHttpActionResult PostUploadServiceBulkmaterial(UMCNOwithItemDesc objmod)

        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                string msg = "Success";
                for (int i = 0; i < objmod.UMCNo1.Length; i++)
                {
                    string query = "INSERT INTO UMCNowithItemdesc (UMCNo, Itemdesc) VALUES (@UMCNo, @Itemdesc)";

                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@UMCNo", objmod.UMCNo1[i]);
                    cmd.Parameters.AddWithValue("@Itemdesc", objmod.Itemdesc1[i]);

                    int x = cmd.ExecuteNonQuery();
                }
                return Json(msg);
            }
        }
        //Insert Furance Reading B
        [Route("api/Inventory/AddFuranceReading")]
        public bool PostFuranceReading(FuranceInductorReading objbud)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("INSERT INTO FuranceInductorReading (DateofReading, Power, LineAMPS, LinePF, LoadAMPS, LoadPF, LoadVolts, Ratio, BushingTempG1, BushingTempG2, BushingTempG3, BushingTempG4, CurrentR, CurrentS, CurrentT) VALUES (@DateofReading, @Power, @LineAMPS, @LinePF, @LoadAMPS, @LoadPF, @LoadVolts, @Ratio, @BushingTempG1, @BushingTempG2, @BushingTempG3, @BushingTempG4, @CurrentR, @CurrentS, @CurrentT)", con);
                cmd.Parameters.AddWithValue("@DateofReading", objbud.DateofReading);
                cmd.Parameters.AddWithValue("@Power", objbud.Power);
                cmd.Parameters.AddWithValue("@LineAMPS", objbud.LineAMPS);
                cmd.Parameters.AddWithValue("@LinePF", objbud.LinePF);
                cmd.Parameters.AddWithValue("@LoadAMPS", objbud.LoadAMPS);
                cmd.Parameters.AddWithValue("@LoadPF", objbud.LoadPF);
                cmd.Parameters.AddWithValue("@LoadVolts", objbud.LoadVolts);
                cmd.Parameters.AddWithValue("@Ratio", objbud.Ratio);
                cmd.Parameters.AddWithValue("@BushingTempG1", objbud.BushingTempG1);
                cmd.Parameters.AddWithValue("@BushingTempG2", objbud.BushingTempG2);
                cmd.Parameters.AddWithValue("@BushingTempG3", objbud.BushingTempG3);
                cmd.Parameters.AddWithValue("@BushingTempG4", objbud.BushingTempG4);
                cmd.Parameters.AddWithValue("@CurrentR", objbud.CurrentR);
                cmd.Parameters.AddWithValue("@CurrentS", objbud.CurrentS);
                cmd.Parameters.AddWithValue("@CurrentT", objbud.CurrentT);

                int i = cmd.ExecuteNonQuery();
                if (i > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        //List Of Furance Reading
        [Route("api/Inventory/AllFuranceReadingData")]
        public IHttpActionResult PostAllFuranceReadingData()
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("select * from FuranceInductorReading", con);
                SqlDataAdapter adp = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                adp.Fill(dt);
                var jsondata = JsonConvert.SerializeObject(dt);
                return Json(jsondata);

            }
        }

        //Update Update Furnace InductorB Data
        [Route("api/Inventory/UpdateFurnaceInductorB")]
        public IHttpActionResult PostUpdateFurnaceInductorB(FuranceInductorReading model)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("UPDATE FuranceInductorReading SET DateofReading = @DateofReading,Power = @Power,LineAMPS = @LineAMPS,LinePF = @LinePF,LoadAMPS = @LoadAMPS,LoadPF = @LoadPF,LoadVolts = @LoadVolts,Ratio = @Ratio,BushingTempG1 = @BushingTempG1,BushingTempG2 = @BushingTempG2,BushingTempG3 = @BushingTempG3,BushingTempG4 = @BushingTempG4,CurrentR = @CurrentR,CurrentS = @CurrentS,CurrentT = @CurrentT WHERE FuranceInductorReadingId = @FuranceInductorReadingId", con);
                cmd.Parameters.AddWithValue("@FuranceInductorReadingId", model.FuranceInductorReadingId);
                cmd.Parameters.AddWithValue("@DateofReading", model.DateofReading);
                cmd.Parameters.AddWithValue("@Power", model.Power);
                cmd.Parameters.AddWithValue("@LineAMPS", model.LineAMPS);
                cmd.Parameters.AddWithValue("@LinePF", model.LinePF);
                cmd.Parameters.AddWithValue("@LoadAMPS", model.LoadAMPS);
                cmd.Parameters.AddWithValue("@LoadPF", model.LoadPF);
                cmd.Parameters.AddWithValue("@LoadVolts", model.LoadVolts);
                cmd.Parameters.AddWithValue("@Ratio", model.Ratio);
                cmd.Parameters.AddWithValue("@BushingTempG1", model.BushingTempG1);
                cmd.Parameters.AddWithValue("@BushingTempG2", model.BushingTempG2);
                cmd.Parameters.AddWithValue("@BushingTempG3", model.BushingTempG3);
                cmd.Parameters.AddWithValue("@BushingTempG4", model.BushingTempG4);
                cmd.Parameters.AddWithValue("@CurrentR", model.CurrentR);
                cmd.Parameters.AddWithValue("@CurrentS", model.CurrentS);
                cmd.Parameters.AddWithValue("@CurrentT", model.CurrentT);
                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    return Ok("Furnace Inductor B Data updated successfully");
                }
                else
                {
                    return BadRequest("No changes were made to the Furnace InductorB details");
                }
            }
        }

        //[HttpPost]
        //[Route("api/Inventory/GetMaterialCostexpenditure")]
        //public IHttpActionResult GetMaterialCostExpenditureData()
        //{
        //    List<MaterialCostData> materialCostList = new List<MaterialCostData>();

        //    using (SqlConnection con = new SqlConnection(constr))
        //    {
        //        con.Open();

        //        string query = "SELECT DateofReading, Power, LineAMPS FROM FuranceInductorReading";

        //        SqlCommand command = new SqlCommand(query, con);
        //        SqlDataReader reader = command.ExecuteReader();

        //        while (reader.Read())
        //        {
        //            MaterialCostData materialCost = new MaterialCostData();
        //            materialCost.Date = reader["DateofReading"].ToString();
        //            materialCost.Power = Convert.ToDouble(reader["Power"]);
        //            materialCost.LineAMPS = Convert.ToDouble(reader["LineAMPS"]);

        //            materialCostList.Add(materialCost);
        //        }
        //    }

        //    return Ok(materialCostList);
        //}

        [HttpPost]
        [Route("api/Inventory/GetFuranceInductorReadingforIndex")]
        public IHttpActionResult GetFuranceInductorReadingforIndex()
        {
            List<FuranceInductorGraph> furancerederList = new List<FuranceInductorGraph>();

            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();

                string query = "SELECT DateofReading, Power, LineAMPS, LinePF, LoadAMPS FROM FuranceInductorReading";

                SqlCommand command = new SqlCommand(query, con);
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    FuranceInductorGraph furancereader = new FuranceInductorGraph();
                    furancereader.Date = reader["DateofReading"].ToString();
                    furancereader.Power = Convert.ToDouble(reader["Power"]);
                    furancereader.LineAMPS = Convert.ToDouble(reader["LineAMPS"]);
                    furancereader.LinePF = Convert.ToDouble(reader["LinePF"]);
                    furancereader.LoadAMPS = Convert.ToDouble(reader["LoadAMPS"]);

                    furancerederList.Add(furancereader);
                }
            }

            return Ok(furancerederList);
        }

        [HttpPost]
        [Route("api/Inventory/GetFuranceInductorReading")]
        public IHttpActionResult GetFuranceInductorReading(DateTime fromDate, DateTime toDate)
        {
            List<FuranceInductorGraph> furancerederList = new List<FuranceInductorGraph>();

            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();

               // string query = "SELECT DateofReading, Power, LineAMPS, LinePF, LoadAMPS FROM FuranceInductorReading WHERE DateofReading BETWEEN @FromDate AND @ToDate";

                string query = "SELECT DateofReading, Power, LineAMPS, LinePF, LoadAMPS, LoadPF, LoadVolts, Ratio " +
               "FROM FuranceInductorReading " +
               "WHERE DateofReading BETWEEN @FromDate AND @ToDate";

                SqlCommand command = new SqlCommand(query, con);
                command.Parameters.AddWithValue("@FromDate", fromDate);
                command.Parameters.AddWithValue("@ToDate", toDate);

                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    FuranceInductorGraph furancereader = new FuranceInductorGraph();
                    furancereader.Date = reader["DateofReading"].ToString();
                    furancereader.Power = Convert.ToDouble(reader["Power"]);
                    furancereader.LineAMPS = Convert.ToDouble(reader["LineAMPS"]);
                    furancereader.LinePF = Convert.ToDouble(reader["LinePF"]);
                    furancereader.LoadAMPS = Convert.ToDouble(reader["LoadAMPS"]);
                    furancereader.LoadPF = Convert.ToDouble(reader["LoadPF"]);  
                    furancereader.LoadVolts = Convert.ToDouble(reader["LoadVolts"]); 
                    furancereader.Ratio = Convert.ToDouble(reader["Ratio"]);

                    furancerederList.Add(furancereader);
                }
            }

            return Ok(furancerederList);
        }

        //[HttpPost]
        //[Route("api/Inventory/GetFuranceInductorReading")]
        //public IHttpActionResult GetFuranceInductorReading(DateTime fromDate, DateTime toDate)
        //{
        //    List<FuranceInductorGraph> furancerederList = new List<FuranceInductorGraph>();

        //    using (SqlConnection con = new SqlConnection(constr))
        //    {
        //        con.Open();

        //        string query = "SELECT DateofReading, Power, LineAMPS, LinePF, LoadAMPS FROM FuranceInductorReading WHERE DateofReading BETWEEN @FromDate AND @ToDate";

        //        SqlCommand command = new SqlCommand(query, con);
        //        command.Parameters.AddWithValue("@FromDate", fromDate);
        //        command.Parameters.AddWithValue("@ToDate", toDate);

        //        SqlDataReader reader = command.ExecuteReader();

        //        while (reader.Read())
        //        {
        //            FuranceInductorGraph furancereader = new FuranceInductorGraph();
        //            furancereader.Date = reader["DateofReading"].ToString();
        //            furancereader.Power = Convert.ToDouble(reader["Power"]);
        //            furancereader.LineAMPS = Convert.ToDouble(reader["LineAMPS"]);
        //            furancereader.LinePF = Convert.ToDouble(reader["LinePF"]);
        //            furancereader.LoadAMPS = Convert.ToDouble(reader["LoadAMPS"]);

        //            furancerederList.Add(furancereader);
        //        }
        //    }

        //    return Ok(furancerederList);
        //}

        //Insert Furance Reading A
        [Route("api/Inventory/AddFuranceReadingA")]
        public bool PostFuranceReadingA(FuranceInductorReading objbud)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("INSERT INTO FuranceInductorReadingA (DateofReading, Power, LineAMPS, LinePF, LoadAMPS, LoadPF, LoadVolts, Ratio, BushingTempG1, BushingTempG2, BushingTempG3, BushingTempG4, CurrentR, CurrentS, CurrentT) VALUES (@DateofReading, @Power, @LineAMPS, @LinePF, @LoadAMPS, @LoadPF, @LoadVolts, @Ratio, @BushingTempG1, @BushingTempG2, @BushingTempG3, @BushingTempG4, @CurrentR, @CurrentS, @CurrentT)", con);
                cmd.Parameters.AddWithValue("@DateofReading", objbud.DateofReading);
                cmd.Parameters.AddWithValue("@Power", objbud.Power);
                cmd.Parameters.AddWithValue("@LineAMPS", objbud.LineAMPS);
                cmd.Parameters.AddWithValue("@LinePF", objbud.LinePF);
                cmd.Parameters.AddWithValue("@LoadAMPS", objbud.LoadAMPS);
                cmd.Parameters.AddWithValue("@LoadPF", objbud.LoadPF);
                cmd.Parameters.AddWithValue("@LoadVolts", objbud.LoadVolts);
                cmd.Parameters.AddWithValue("@Ratio", objbud.Ratio);
                cmd.Parameters.AddWithValue("@BushingTempG1", objbud.BushingTempG1);
                cmd.Parameters.AddWithValue("@BushingTempG2", objbud.BushingTempG2);
                cmd.Parameters.AddWithValue("@BushingTempG3", objbud.BushingTempG3);
                cmd.Parameters.AddWithValue("@BushingTempG4", objbud.BushingTempG4);
                cmd.Parameters.AddWithValue("@CurrentR", objbud.CurrentR);
                cmd.Parameters.AddWithValue("@CurrentS", objbud.CurrentS);
                cmd.Parameters.AddWithValue("@CurrentT", objbud.CurrentT);

                int i = cmd.ExecuteNonQuery();
                if (i > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        //List Of Furance Reading A Data
        [Route("api/Inventory/AllFuranceReadingAData")]
        public IHttpActionResult PostAllFuranceReadingAData()
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("select * from FuranceInductorReadingA", con);
                SqlDataAdapter adp = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                adp.Fill(dt);
                var jsondata = JsonConvert.SerializeObject(dt);
                return Json(jsondata);

            }
        }

        //Update Update Furnace Inductor A Data
        [Route("api/Inventory/UpdateFurnaceInductorA")]
        public IHttpActionResult PostUpdateFurnaceInductorA(FuranceInductorReading model)
        {
            using (SqlConnection con = new SqlConnection(constr))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("UPDATE FuranceInductorReadingA SET DateofReading = @DateofReading,Power = @Power,LineAMPS = @LineAMPS,LinePF = @LinePF,LoadAMPS = @LoadAMPS,LoadPF = @LoadPF,LoadVolts = @LoadVolts,Ratio = @Ratio,BushingTempG1 = @BushingTempG1,BushingTempG2 = @BushingTempG2,BushingTempG3 = @BushingTempG3,BushingTempG4 = @BushingTempG4,CurrentR = @CurrentR,CurrentS = @CurrentS,CurrentT = @CurrentT WHERE FuranceInductorReadingAId = @FuranceInductorReadingAId", con);
                cmd.Parameters.AddWithValue("@FuranceInductorReadingAId", model.FuranceInductorReadingAId);
                cmd.Parameters.AddWithValue("@DateofReading", model.DateofReading);
                cmd.Parameters.AddWithValue("@Power", model.Power);
                cmd.Parameters.AddWithValue("@LineAMPS", model.LineAMPS);
                cmd.Parameters.AddWithValue("@LinePF", model.LinePF);
                cmd.Parameters.AddWithValue("@LoadAMPS", model.LoadAMPS);
                cmd.Parameters.AddWithValue("@LoadPF", model.LoadPF);
                cmd.Parameters.AddWithValue("@LoadVolts", model.LoadVolts);
                cmd.Parameters.AddWithValue("@Ratio", model.Ratio);
                cmd.Parameters.AddWithValue("@BushingTempG1", model.BushingTempG1);
                cmd.Parameters.AddWithValue("@BushingTempG2", model.BushingTempG2);
                cmd.Parameters.AddWithValue("@BushingTempG3", model.BushingTempG3);
                cmd.Parameters.AddWithValue("@BushingTempG4", model.BushingTempG4);
                cmd.Parameters.AddWithValue("@CurrentR", model.CurrentR);
                cmd.Parameters.AddWithValue("@CurrentS", model.CurrentS);
                cmd.Parameters.AddWithValue("@CurrentT", model.CurrentT);
                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    return Ok("Furnace Inductor A Data updated successfully");
                }
                else
                {
                    return BadRequest("No changes were made to the Furnace Inductor A details");
                }
            }
        }


    }
}

