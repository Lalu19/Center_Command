
function GetMaterialData(Usc) {
    debugger
    var Usc = Usc;
    // Check if UMC_No is empty
    if (!Usc) {
        // Clear all fields
        document.getElementById("UscDetails").value = "";
        document.getElementById("ARC_No").value = "";
        document.getElementById("VendorName").value = "";
        document.getElementById("Price3").value = "";

        return;
    }
    //var status = 1;

    $.ajax({
        url: '/api/Inventory/GetServicedetailsbyUsc',
        method: 'POST',

        data: { Usc: Usc },
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

                    document.getElementById("UscDetails").value = data[i].UscDetails;
                    document.getElementById("ARC_No").value = data[i].ARC_No;
                    document.getElementById("VendorName").value = data[i].Vendor_Name;
                    document.getElementById("Price3").value = data[i].Price;
                }

            }
            else {
                document.getElementById("UscDetails").value = "";
                document.getElementById("ARC_No").value = "";
                document.getElementById("VendorName").value = "";
                document.getElementById("Price3").value = "";
            }
        }
    })
}

function ServiceDataInsert() {
    debugger
   
    var VendorName = document.getElementById("VendorName").value;
    var ServiceType = document.getElementById("ServiceType").value;
    var ServiceCost = document.getElementById("ServiceCost").value;
    var EntryDate = document.getElementById("EntryDate").value;
    var Fromlength = document.getElementById("Fromlength").value;
    var Tolength = document.getElementById("Tolength").value;
    var Usc = document.getElementById("Usc").value;
    var UscDetails = document.getElementById("UscDetails").value;
    var Price3 = document.getElementById("Price3").value;
    var Unit3 = document.getElementById("Unit3").value;
    var ARC_No = document.getElementById("ARC_No").value;
    var Remarks3 = document.getElementById("Remarks3").value;
 
    var data = {
        VendorName: VendorName, ServiceType: ServiceType, ServiceCost: ServiceCost, Entry_Date2: EntryDate, Fromlength: Fromlength, Tolength: Tolength, Usc: Usc, UscDetails: UscDetails, Price3: Price3, Unit3: Unit3, ARC_No: ARC_No, Remarks3: Remarks3
    }
    $.ajax({
        url: '/api/Inventory/ServiceDataInsert',
        dataType: 'json',
        data: data,
        type: 'Post',

        success: function (response) {
            debugger
            //var data = JSON.parse(response);
            if (response == true) {
                alert("Service Saved Successful");
                location.reload();
                

                //document.getElementById("Location") = clear;
                //document.getElementById("SubLocationName") = clear;
            } else {
                alert("Something went Wrong!!");
            }
        }

    })
}


function Upload() {
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+([^)]+)\)+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
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
    }

    else {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {

            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
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
            }
            else {
                alert("This browser does not support HTML5.");
            }
        }
        else {
            alert("Please upload a valid Excel file.");
        }


    }
}

function ProcessExcel(data) {
    var Usc = [];
    var UscDetails = [];
    var ARC_No = [];
    var VendorName = [];
    var ServiceType = [];
    var Unit3 = [];
    var Price3 = [];
    var ServiceCost = [];
    var Fromlength = [];
    var Tolength = [];
    var EntryDate = [];
    var Remarks3 = [];
   
    var workbook = XLSX.read(data, {
        type: 'binary'
    });
    var firstSheet = workbook.SheetNames[0];
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    for (var i = 0; i < excelRows.length; i++) {
        Usc.push(excelRows[i].Usc);
        UscDetails.push(excelRows[i].UscDetails);
        ARC_No.push(excelRows[i].ARC_No);
        VendorName.push(excelRows[i].VendorName);
        ServiceType.push(excelRows[i].ServiceType);
        Unit3.push(excelRows[i].Unit7);
        Price3.push(excelRows[i].Price7);
        ServiceCost.push(excelRows[i].ServiceCost);
        Fromlength.push(excelRows[i].Fromlength);
        Tolength.push(excelRows[i].Tolength);
        EntryDate.push(excelRows[i].EntryDate);
        Remarks3.push(excelRows[i].Remark);
    }
    var dataa = {
        Usc7: Usc,
        UscDetails7: UscDetails,
        ARC_No7: ARC_No,
        VendorName7: VendorName,
        ServiceType7: ServiceType,
        Unit7: Unit3,
        Price7: Price3,
        ServiceCost7: ServiceCost,
        Fromlength7: Fromlength,
        Tolength7: Tolength,
        EntryDate7: EntryDate,
        Remarks7: Remarks3
    };
    console.log(dataa);
    $.ajax({
        url: '/api/Inventory/UploadServiceBulkMaterial',
        method: 'POST',
        data: JSON.stringify(dataa),
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            if (response === "Success") {
                location.reload();
                alert("Excel Uploaded Successfully");
            } else {
                location.reload();
                alert("Failed to save material data. Please try again.");
            }
        },
        error: function (xhr, status, error) {
            console.log("An error occurred:");
            console.log("Status: " + status);
            console.log("Error: " + error);
            console.log(xhr.responseText);
            location.reload();
            alert("An error occurred while processing the data. Please try again.");
        }
    });
}