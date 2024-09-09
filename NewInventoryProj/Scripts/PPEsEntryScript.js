
function Entryppes() {

    var umcno = document.getElementById("UMC_No").value;
    var Item_Desc = document.getElementById("Item_Desc").value;
    var UOM = document.getElementById("UOM").value;
    var Qty = document.getElementById("Qty").value;
    var Unit_Price = document.getElementById("Unit_Price").value;
    var IssueDate = document.getElementById("IssueDate").value;
    var Name = document.getElementById("Name").value;
    var EmpId = document.getElementById("EmpId").value;
    var ReservationNo = document.getElementById("ReservationNo").value;

    //code changeed by sakti on date(16 Aug 2021) re: Validation
    debugger
    if (umcno != "" && Item_Desc != "" && UOM != "" && Qty != "" && Unit_Price != "" && IssueDate != "" && Name != "" && EmpId != "" && ReservationNo != "")
    {
        var data = {
            umcno: umcno, Item_Desc: Item_Desc, UOM: UOM, Qty: Qty, Unit_Price: Unit_Price, IssueDate: IssueDate, Name: Name, EmpId: EmpId, ReservationNo: ReservationNo
        }
        $.ajax({
            type: "POST",
            url: '/api/Inventory/InsertPPEsData',
            data: data,
            dataType: 'json',
            success: function (response) {

                var reslt = response;
                if (reslt == true) {
                    alert("Suucessful");
                    location.reload();
                }

                else {
                    alert("Something went Wrong! please contact to Adminstrator");
                }

            }
        })
    }
    else {
        alert("field can't be Empty");
        

    }





   
}


//PPES data insert by excel sheet bulk entry

function Upload() {
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }
}
function ProcessExcel(data) {
    var UMCNO = []; var ItemDesc = [];
    var UOM = []; var Qty = []; var Unit_Price = []; var IssueDate = []; var Name = [];
    var EmpID = []; var ReservationNo = [];
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    //Add the data rows from Excel file.
    for (var i = 0; i < excelRows.length; i++) {

        UMCNO.push(excelRows[i].UMC_NO);
        ItemDesc.push(excelRows[i].Item_Desc);
        UOM.push(excelRows[i].UOM);
        Qty.push(excelRows[i].Qty);      
        var unpr = excelRows[i].Unit_Price;
        var newString = unpr.replace(',', '');
        Unit_Price.push(newString);
        IssueDate.push(excelRows[i].IssueDate);
        Name.push(excelRows[i].Name);
        EmpID.push(excelRows[i].EmpID);
        ReservationNo.push(excelRows[i].ReservationNo);
       
    }
    var dataa = {
        umcno1: UMCNO, Item_Desc1: ItemDesc, UOM1: UOM, Qty1: Qty, Unit_Price1: Unit_Price, IssueDate1:IssueDate,
        Name1: Name, EmpId1: EmpID, ReservationNo1: ReservationNo
    }
    $.ajax({
        url: '/api/Inventory/UploadBulkPPEsData',
        method: 'POST',
        data: dataa,
        dataType: 'json',
        success: function (response) {

            var reslt = response;
            alert(reslt);
            location.reload();

        }
    })
}

$(document).ready(function () {

    $.ajax({                                             
        url: '/api/Inventory/BindAllPPEsData',
        type: 'POST',
        datatype: 'json',

        //data: { ofst: flag, fetch: 1, user: user },

        beforeSend: function () {
            $("#loader").html("<span class='fa fa-spin'><span class='fa fa-spinner'></span></span>Loading...");
        },

        success: function (data) {
            $("#loader").hide();
            $('#allmatdata').find('tbody').empty();

            $.each(JSON.parse(data), function (i, val) {              
                var slno = i + 1;

                var text = "<tr><td>"
                    + slno
                    + "</td><td>"
                    + val.UmcNo
                    + "</td><td>"
                    + val.Item_Desc
                    + "</td><td>"
                    + val.UOM
                    + "</td> <td>"
                    + val.Qty
                    + "</td> <td>"
                    + val.UnitPrice
                    + "</td> <td>"
                    + val.IssueDate
                    + "</td> <td>"
                    + val.Name
                    + "</td> <td>"
                    + val.EmpId
                    + "</td> <td>"
                    + val.ReservationNo
                    + "</td></tr>";
                //alert(text);						
                $('#allmatdata').find('tbody').append(text);
                /* $('#storeData').dataTable();*/
            });
            $('#allmatdata').dataTable(
                {
                    // parameters
                    // "scrollY": 400,
                    "lengthMenu": [[10, 15, 20, -1],
                    [10, 15, 20, "All"]],
                    autoWidth: false,
                    responsive: true,
                    "scrollX": true,

                    "drawCallback": function (settings) {

                        //$('[data-toggle="tooltip"]').tooltip({
                        //    container: 'body'
                        //})


                        // add as many tooltips you want

                    },
                });
        }
    });
});