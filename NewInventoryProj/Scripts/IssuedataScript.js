$(document).ready(function () {
    // Debounce function to delay execution of a function
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Function to fetch and update sub-locations based on UMC number and location
    function updateSubLocations() {
        var umcNo = $("#UMC_No").val();
        var location = $("#Location").val();
        console.log("UMC Number:", umcNo);
        console.log("Location:", location);
        if (umcNo && location) {
            $.ajax({
                url: '/api/Inventory/GetSubLocationsWithQtyByLocation',
                method: 'POST',
                data: { UMC_No: umcNo, Location: location },
                dataType: 'json',
                success: function (response) {
                    console.log("Sub-locations Response:", response);
                    $('#SubLocation').empty();
                    var data = JSON.parse(response);
                    if (data && data.length > 0) {
                        data.forEach(function (item) {
                            $('#SubLocation').append('<option value="' + item.sub_location + '">' + item.sub_location + ' (' + item.quantity + ')' + '</option>');
                        });
                    } else {
                        $('#SubLocation').append('<option value="">No sublocations found</option>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching sublocations:", error);
                    $('#SubLocation').empty().append('<option value="">Error fetching sublocations</option>');
                }
            });
        } else {
            $('#SubLocation').empty().append('<option value="">Select UMC Number and Location</option>');
        }
    }

    // Debounce the updateSubLocations function to delay execution after typing
    var debouncedUpdateSubLocations = debounce(updateSubLocations, 500);

    $("#UMC_No").on("input", function () {
        if ($(this).val().trim() === "") {
            // Clear related data if UMC number is empty
            $('#SubLocation').empty();
            $('#Location').empty();
            $('#Item_Desc').empty();
            $('#AvlQty').val("");
            $('#UOM').empty();
        } else {
            debouncedUpdateSubLocations();
        }
    });

    $("#UMC_No").on("input", function () {
        debouncedUpdateSubLocations();
    });

    // Function to handle Location dropdown change
    $('#Location').change(function () {
        updateSubLocations();
    });

    // Initial call to update sub-locations
    updateSubLocations();

    $.ajax({
        type: "POST",
        url: "/api/Inventory/BindAllItemNames",
        dataType: "json",
        data: '',
        contentType: "application/json",
        success: function (response) {
            var data = JSON.parse(response);
            for (var i = 0; i < data.length; i++) {
                $("#Item_Desc").append(" <option  value='" + data[i].umc_no + "'>" + data[i].item_desc + "</option>");
            }
        }
    });
});


function GetIssueData(UMC_No) {
    var umc = UMC_No;
    // Clear the fields initially
    document.getElementById("AvlQty").value = "";
    document.getElementById("UOM").value = "";
    document.getElementById("Item_Desc").value = "";
    document.getElementById("moField").value = "";
    //var status = 1;
    $.ajax({
        url: '/api/Inventory/GetMatIssuebyUMC',
        method: 'POST',
        data: { UMC_No: umc },
        dataType: 'json',
        onbeforeUnload: function () {
            // document.getElementById("plzwt").value = "Login Please Wait..";
        },

        success: function (response) {

            //$("#LogForm")[0].reset();
            var data = JSON.parse(response);
            if (data[0] != null) {
                for (var i = 0; i < data.length; i++) {
                    document.getElementById("AvlQty").value = parseFloat(data[i].qty).toFixed(2);
                    document.getElementById("UOM").value = "";
                    document.getElementById("Item_Desc").value = data[i].item_desc;
                    //$("#Item_Desc").append("<option selected='selected' value='" + data[i].umc_no + "'>" + data[i].item_desc + "</option>");
                    //document.getElementById("AvlQty").value = data[i].qty;
                    document.getElementById("UOM").value = data[i].unit;
                    document.getElementById("UMC_No").value = data[i].umc_no;

                    //console.log("CentralStore_Item value:", data[i].CentralStore_Item);
                    if (data[i].CentralStore_Item === true) {
                       // console.log("CentralStore_Item is true. Showing MO field.");
                        $("#moField").show(); 
                        $("#moField input").prop('required', true);
                    } else {
                       // console.log("CentralStore_Item is not true. Hiding MO field.");
                        $("#moField").hide();
                        $("#moField input").prop('required', false);
                    }

                    $.ajax({
                        url: '/api/Inventory/GetTotalQty',
                        method: 'POST',
                        data: { UMC_No: umc },
                        dataType: 'json',
                        success: function (totalQtyResponse) {
                            //document.getElementById("AvlQty").value = totalQtyResponse.totalQty;
                            document.getElementById("AvlQty").value = parseFloat(totalQtyResponse.totalQty).toFixed(2); 
                          
                          
                        }
                    });
                  
                    $.ajax({
                        url: '/api/Inventory/GetLocationsByUMC',
                        method: 'POST',
                        data: { UMC_No: umc },
                        dataType: 'json',
                        success: function (response) {
                            console.log("Locations response:", response);
                            var data = JSON.parse(response);
                            if (data[0] != null) {

                                $('#Location').empty();

                                var locationQuantities = {};
                                data.forEach(item => {
                                    var quantity = parseFloat(item.total_qty);
                                    if (!isNaN(quantity)) {
                                        if (!locationQuantities[item.location]) {
                                            locationQuantities[item.location] = quantity;
                                        } else {
                                            locationQuantities[item.location] += quantity;
                                        }
                                    }
                                });
                                // Append each location with its quantity to the dropdown
                                for (var location in locationQuantities) {
                                    $('#Location').append(`<option value="${location}">${location} (${locationQuantities[location]})</option>`);
                                }
                            } else {
                                $('#Location').empty().append('<option value="">No locations found</option>');
                            }
                        }
                    });
                }
            }

            else {
                // Handle case when UMC_No is empty
                console.log("UMC_No is empty");
            }
        }
    })
}

//GetReceivername by Receiverid
function GetReceivernamebyid(ReceiverId) {
    debugger
    var receiverId = ReceiverId;
    if (!receiverId) {
        document.getElementById("Receivername").value = "";
        return;
    }
    $.ajax({
        url: '/api/Inventory/GetReceivernamebyid',
        method: 'POST',

        data: { ReceiverId: receiverId },
        dataType: 'json',
        onbeforeUnload: function () {
            // document.getElementById("plzwt").value = "Login Please Wait..";
        },
        success: function (response) {
            debugger
            //$("#LogForm")[0].reset();
            var data = JSON.parse(response);
            if (data[0] != null) {
                for (var i = 0; i < data.length; i++) {

                    document.getElementById("Receivername").value = data[i].EmployeeName;
                }

            }
            else {
                document.getElementById("Receivername").value = "";
            }
        }
    })
}
//GetReceiverid by Receivername
function GetReceiveridbyname(Receivername) {
    debugger
    var receivername = Receivername;
    if (!receivername) {
        document.getElementById("ReceiverId").value = "";
        return;
    }
    $.ajax({
        url: '/api/Inventory/GetReceiveiridbyname',
        method: 'POST',

        data: { Receivername: receivername },
        dataType: 'json',
        onbeforeUnload: function () {
            // document.getElementById("plzwt").value = "Login Please Wait..";
        },
        success: function (response) {
            debugger
            //$("#LogForm")[0].reset();
            var data = JSON.parse(response);
            if (data[0] != null) {
                for (var i = 0; i < data.length; i++) {

                    document.getElementById("ReceiverId").value = data[i].EmployeeCode;
                }

            }
            else {
                document.getElementById("ReceiverId").value = "";
            }
        }
    })
}
//GetIssueirname by issueirid
function GetIssueirnamebyid(IssueirId) {
    debugger
    var IssueirId = IssueirId;
    if (!IssueirId) {
        document.getElementById("Issueirname").value = "";
        return;
    }
    $.ajax({
        url: '/api/Inventory/GetIssueirnamebyid',
        method: 'POST',

        data: { IssueirId: IssueirId },
        dataType: 'json',
        onbeforeUnload: function () {
            // document.getElementById("plzwt").value = "Login Please Wait..";
        },
        success: function (response) {
            debugger
            //$("#LogForm")[0].reset();
            var data = JSON.parse(response);
            if (data[0] != null) {
                for (var i = 0; i < data.length; i++) {

                    document.getElementById("Issueirname").value = data[i].EmployeeName;
                }

            }
            else {
                document.getElementById("Issueirname").value = "";
            }
        }
    })
}
//GetIssueirid by Issueirname
function GetIssueiridbyname(Issueirname) {
    debugger
    var Issueirname = Issueirname;
    if (!Issueirname) {
        document.getElementById("Issueier_Id").value = "";
        return;
    }
    $.ajax({
        url: '/api/Inventory/GetIssueiridbyname',
        method: 'POST',

        data: { Issueirname: Issueirname },
        dataType: 'json',
        onbeforeUnload: function () {
            // document.getElementById("plzwt").value = "Login Please Wait..";
        },
        success: function (response) {
            debugger
            //$("#LogForm")[0].reset();
            var data = JSON.parse(response);
            if (data[0] != null) {
                for (var i = 0; i < data.length; i++) {

                    document.getElementById("Issueier_Id").value = data[i].EmployeeCode;
                }

            }
            else {
                document.getElementById("Issueier_Id").value = "";
            }
        }
    })
}
function bindallitems() {
   
    $.ajax({
        type: "POST",
        url: "/api/Inventory/BindAllItemNames",
        dataType: "json",
        data: '',
        contentType: "application/json",
        success: function (response) {

            var data = JSON.parse(response);
            $("#Item_Desc").empty();
            $("#Item_Desc").append("<option value='0'><-------Select-------------></option>");
            for (var i = 0; i < data.length; i++) {
               
                $("#Item_Desc").append(" <option  value='" + data[i].umc_no + "'>" + data[i].item_desc + "</option>");

            }
        }
    });
}

//function GetIssueData(UMC_No) {
//    $.ajax({
//        url: '/api/Inventory/GetMatIssuebyUMC',
//        method: 'POST',
//        data: { UMC_No: UMC_No },
//        dataType: 'json',
//        success: function (response) {
//            var data = JSON.parse(response);
//            $("#Location").empty(); // Clear existing options
//            if (data.length > 0) {
//                // Iterate over the locations and quantities and populate the dropdown
//                for (var i = 0; i < data.length; i++) {
//                    $("#Location").append("<option value='" + data[i].location + "'>" + data[i].location + " (" + data[i].total_qty + ")</option>");
//                }
//            } else {
//                $("#Location").append("<option value=''>No locations found</option>");
//            }
//        },
//        error: function () {
//            $("#Location").empty();
//            $("#Location").append("<option value=''>Error fetching locations</option>");
//        }
//    });
//}

function InsertIssueData() {
    var Issueier_Id = document.getElementById("Issueier_Id").value;
    var Issueirname = document.getElementById("Issueirname").value;
    var ReceiverId = document.getElementById("ReceiverId").value;
    var Receivername = document.getElementById("Receivername").value;
    var IssueDate = document.getElementById("IssueDate").value;
    var EntryDate = document.getElementById("EntryDate").value;
    var Issueqty = document.getElementById("Issue_Qty").value;
    var UMC_No = document.getElementById("UMC_No").value;
    var Item_Desc = document.getElementById("Item_Desc").value;
    var UOM = document.getElementById("UOM").value;
    var AvlQty = document.getElementById("AvlQty").value;
    var Plant_Location = document.getElementById("PlantLocation").value;
    var Location = document.getElementById("Location").value;
    var Sub_Location = document.getElementById("SubLocation").value;
    var MO_No = document.getElementById("MO_No").value;

    // Check if MO field is empty
    if ($("#moField input").prop('required') && $("#moField input").val() === "") {
        alert("MO number is required. Please fill in the MO field.");
        return; 
    }

    var umc = [];
    var itemdesc = [];
    var avlQty = [];
    var issueqty = [];
    var uom = [];
    var remarks = [];
    var location = [];
    var subLocation = [];

    $('#tablestor tr').each(function () {
        var cells = $(this).find('td');
        umc.push(cells.eq(1).text());
        itemdesc.push(cells.eq(2).text());
        location.push(cells.eq(3).text());
        subLocation.push(cells.eq(4).text());
        avlQty.push(cells.eq(5).text());
        issueqty.push(cells.eq(6).text());
        uom.push(cells.eq(7).text());
        remarks.push(cells.eq(8).text());
    });

    if (Issueier_Id /*&& Issueirname && Receivername*/ && ReceiverId && IssueDate && EntryDate && Issueqty && Plant_Location && Location && (Sub_Location || Sub_Location === "")) {
        var DATA = {
            ItemDesc1: itemdesc,
            avlqty1: avlQty,
            unit1: uom,
            umcno1: umc,
            issueqty1: issueqty,
            IssueirId: Issueier_Id,
            Issueirname: Issueirname,
            ReceiverId: ReceiverId,
            Receivername: Receivername,
            remarks1: remarks,
            Issue_Date: IssueDate,
            EntryDate: EntryDate,
            Plant_Location: Plant_Location,
            location1: location,
            sublocation1: subLocation,
            MO_No: MO_No

        };

        $.ajax({
            url: '/api/Inventory/InsertIssueData',
            method: 'POST',
            data: JSON.stringify(DATA), 
            contentType: 'application/json',
            success: function (response) {
                if (response === true) {
                    alert("Equipment Issued Successfully");
                    window.location.reload();
                } else {
                    alert("Something went Wrong!!");
                }
            }
        });
    } else {
        alert("Please fill in all the required fields.");
    }
}


//function InsertIssueData() {
    
//    debugger
//    var Issueier_Id = document.getElementById("Issueier_Id").value;
//    var ReceiverId = document.getElementById("ReceiverId").value;
//    var IssueDate = document.getElementById("IssueDate").value;
//    var Issueqty = document.getElementById("Issue_Qty").value;
//    //code change for validation 
//    //code changed by sakti on date(16 Aug 2021)
//    var UMC_No = document.getElementById("UMC_No").value;
//    var Item_Desc = document.getElementById("Item_Desc").value;
//    var UOM = document.getElementById("UOM").value;
//    var AvlQty = document.getElementById("AvlQty").value;
//     var Plant_Location = document.getElementById("PlantLocation").value;
// 
   
//    var checkboxValues = [];
//    var umc = []; var itemdesc = []; var partno = []; var avlQty = []; var issueqty = []; var uom = []; var remarks = [];
//    var count = $('#tablestor tr').length;
//    var table = document.getElementById("tablestor");
//    //gets table
//    var oTable = document.getElementById('tablestor');

//    //gets rows of table
//    var rowLength = oTable.rows.length;


//    //code change for validation 
//    //code changed by sakti on date(16 Aug 2021)
    

//    if (UMC_No != "" && Item_Desc != "" && UOM != "" && AvlQty != "" && Issueier_Id != "" && ReceiverId != "" && IssueDate != "" && Issueqty != "" && PlantLocation != "")
//    {
//        for (i = 0; i < rowLength; i++) {

//            //gets cells of current row  
//            var oCells = oTable.rows.item(i).cells;

//            //gets amount of cells of current row
//            var cellLength = oCells.length;
//            umc.push(oCells.item(1).innerHTML);
//            itemdesc.push(oCells.item(2).innerHTML)
//            //partno.push(oCells.item(3).innerHTML)
//            avlQty.push(oCells.item(3).innerHTML)
//            issueqty.push(oCells.item(4).innerHTML)
//            uom.push(oCells.item(5).innerHTML)
//            remarks.push(oCells.item(6).innerHTML)


//        }
//    }
//    else {
//        alert("Must fill All the Field");

//    }

   


//    //loops through rows    
    
//    var DATA = {
//        ItemDesc1: itemdesc, avlqty1: avlQty, unit1: uom, umcno1: umc, issueqty1: issueqty, IssueirId: Issueier_Id, ReceiverId: ReceiverId, remarks1: remarks, Issue_Date: IssueDate,  Plant_Location: Plant_Location
//    };
//    if (Issueqty == null || Issueqty == "")
//    {
//        alert("Please issue some material and then Click on Enter.");
//    } else
//    {


//        $.ajax({
//            url: '/api/Inventory/InsertIssueData',
//            method: 'POST',

//            data: DATA,
//            dataType: 'json',           
//            success: function (response) {

//                var data = JSON.parse(response);
//                if (data == true) {
//                    alert("Equipement Issued Successful");
//                    window.location.reload();

//                } 
//                else {
//                    alert("Something went Wrong!!");

//                }
//            }
//        })

//    }
//}

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
    var UMCNO = [];
    var ItemDesc = [];
    var UOM = []; var IssueQty = []; var ReceiverId = []; var IssueierId = []; var IssueDate = [];
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
        UMCNO.push(excelRows[i].UMCNO);
        ItemDesc.push(excelRows[i].ItemDesc);
        UOM.push(excelRows[i].UOM);
        IssueQty.push(excelRows[i].IssueQty);
        ReceiverId.push(excelRows[i].ReceiverId);
        IssueierId.push(excelRows[i].IssuierId);
        IssueDate.push(excelRows[i].IssueDate);
    }
    var data = { UMCNO1: UMCNO, Item_Desc1: ItemDesc, UOM1: UOM, IssueQty1: IssueQty, ReceiverId1: ReceiverId, IssueierId1: IssueierId, IssueDate1: IssueDate }
    $.ajax({
        url: '/api/Inventory/UploadBulkIssuetest',
        dataType: 'json',
        method: 'POST',
        data: data,
       
        success: function (response) {

            var reslt = response;
            if (reslt == "true") {
                alert("Succesfull");
            } else if (reslt == "false") {
                alert("Failed");
            } else {
                alert(reslt + "   These Items are not availble. Please contact to Adminstrator.");
            }


           
        }
    })
    var dvExcel = document.getElementById("dvExcel");
    dvExcel.innerHTML = UMCNO, ItemDesc, UOM, IssueQty, ReceiverId, IssueierId, IssueDate;

}
