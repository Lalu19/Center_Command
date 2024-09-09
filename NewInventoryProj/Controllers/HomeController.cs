using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using BusinessLogicLayer;
using System.Web.Helpers;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using OfficeOpenXml;
using System.Data;
using Microsoft.IdentityModel.Tokens;
using System.IO;
using System.ComponentModel.DataAnnotations;

namespace Inventory_Proj_2.Controllers
{
    public class HomeController : Controller
    {
        //==========================================================================================================================
        //create session

        public string createSession(string sessionvar)
        {
            var ss = sessionvar.Split('_');
            var catgry = ss[1];
            var sessionvarr = ss[0];


            Session["User"] = sessionvarr;
            Session["Category"] = catgry;
            return Session["Category"].ToString();
        }

        //create login page
        public ActionResult Login()
        {
            if (Session["User"] == null)
            {
                return View();
            }
            else {
                return View("Index");
            }


        }
        //log out method
        public ActionResult LogOut(string User)
        {
            Session.RemoveAll();
            return RedirectToAction("Login");
        }
        //==========================================================================================================================
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            if (Session["User"] != null)
            {
                ViewBag.ShowMarqueeMessage = ViewBag.materialnotavailble != null;
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }
        public ActionResult Default()
        {
            return View();
            //}
        }
        //==========================================================================================================================
        //insert employee view create
        public ActionResult EmployeeInsert()
        {

            return View();

        }
        public ActionResult InserrtEmployee(EmployeeModel objemp)
        {
            if (Session["User"] != null)
            {

                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }

        //bind employee data in table

        public ActionResult EmployeeList(EmployeeModel objemp)
        {
            if (Session["User"] != null)
            {

                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }
        //==========================================================================================================================
       
        //==========================================================================================================================

        //Add Employee with code name wise
        public ActionResult AddEmployeecodewithEmployee()
        {
            if (Session["User"] != null)
            {

                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }
        public ActionResult ListofEmployeecode()
        {
            return View();
        }

        //emergency data approval view
        public ActionResult EmergencyApproval()
        {
            if (Session["User"] != null)
            {

                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }
       
        //demo page for testing 
        public ActionResult DemoPage()
        {
            return View();
        }

        public class Demo
        {
            public string data { get; set; }
        }
        public ActionResult AddUMCNOwithItemDesc()
        {
            if (Session["User"] != null)
            {

                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }
        public ActionResult ListofUMCNoWithItemDesc()
        {
            return View();
        }

        public ActionResult AddFURNACEINDUCTOREADING()
        {
            //if (Session["User"] != null)
            //{

            //    return View();
            //}
            //else
            //{
            //    return RedirectToAction("Login");
            //}
            return View();
        }
        public ActionResult ListofFuranceInductorReading()
        {
            return View();
        }

        public ActionResult FuranceInductorGraphPage()
        {
            return View();
        }
        public ActionResult AddFURNACEINDUCTORAREADING()
        {
            return View();
        }
        public ActionResult ListofFuranceInductorAReading()
        {
            return View();
        }

    }

}
