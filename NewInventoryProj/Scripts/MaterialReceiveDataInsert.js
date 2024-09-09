

function GetMaterialData(UMC_No) {
    debugger
    var umc = UMC_No;
    // Check if UMC_No is empty
    if (!umc) {
        // Clear all fields
        document.getElementById("Item_Desc").value = "";
        document.getElementById("New_UMC").value = "";
        document.getElementById("UNIT").value = "";
        document.getElementById("UnitPrice").value = "";
        document.getElementById("Location").value = "";
        document.getElementById("SubLocation").value = "";
        document.getElementById("MinQty").value = "";
        document.getElementById("Make").value = "";
        document.getElementById("Area").value = "";
        document.getElementById("TotalPrice").value = "";
        document.getElementById("Total_Qty").value = "";
        document.getElementById("hidtotalqty").value = "";
        document.getElementById("Category").value = "";
        document.getElementById("Oldtotalpricevalue").value = "";

        return; 
    }
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
            debugger
            //$("#LogForm")[0].reset();
            var data = JSON.parse(response);
            if (data[0] != null) {
                for (var i = 0; i < data.length; i++) {
                    
                    document.getElementById("Item_Desc").value = data[i].item_desc;
                    document.getElementById("New_UMC").value = data[i].new_umc;
                    //document.getElementById("PartNo").value = data[i].part_no;
                    //document.getElementById("AvlQty").value = data[i].Qty;
                    document.getElementById("UNIT").value = data[i].unit;
                    var text = "<option value=" + data[i].location + ">" + data[i].location+"</option>"
                    document.getElementById("Location").append = text;
                    //document.getElementById("Location").innerText = data[i].Location;
                    document.getElementById("SubLocation").value = data[i].sub_location;
                    document.getElementById("MinQty").value = data[i].min_qty;
                    document.getElementById("UnitPrice").value = data[i].unit_price;
                    document.getElementById("Make").value = data[i].make;
                    document.getElementById("Area").value = data[i].area;
                   // document.getElementById("TotalPrice").value = data[i].net_price;
                    //document.getElementById("Total_Qty").value = data[i].qty;
                    //document.getElementById("hidtotalqty").value = data[i].qty;
                    document.getElementById("Category").value = data[i].category;

                    // Set the selected option in the category dropdown
                    var category = data[i].category;
                    console.log("Category:", category);
                    var categoryDropdown = document.getElementById("Category");
                    for (var j = 0; j < categoryDropdown.options.length; j++) {
                        console.log("Dropdown option:", categoryDropdown.options[j].value);
                        if (categoryDropdown.options[j].value === category) {
                            console.log("Match found:", category);
                            categoryDropdown.selectedIndex = j;
                            break;
                        }
                    }
                    categoryDropdown.selectedIndex = j;
                    $(categoryDropdown).trigger('change'); 

                    //fetch total Qty
                    $.ajax({
                        url: '/api/Inventory/GetTotalQty',
                        method: 'POST',
                        data: { UMC_No: umc },
                        dataType: 'json',
                        success: function (totalQtyResponse) {
                            document.getElementById("Total_Qty").value = totalQtyResponse.totalQty;
                        }
                    });
                    //fetch total net_price
                    $.ajax({
                        url: '/api/Inventory/GetTotalnetprice',
                        method: 'POST',
                        data: { UMC_No: umc },
                        dataType: 'json',
                        success: function (totalpriceResponse) {    
                            document.getElementById("TotalPrice").value = totalpriceResponse.totalPricee;
                          //  document.getElementById("Oldtotalpricevalue").value = totalpriceResponse.totalPricee;
                        }
                    });



                    //// Populating Category dropdown
                    //var text = "<option value='" + data[i].category + "'>" + data[i].category + "</option>"; 
                    //$("#Category").html(text); 
                }
                    
            }
            else {
                document.getElementById("Item_Desc").value ="";
                document.getElementById("New_UMC").value = "";
                //document.getElementById("PartNo").value ="";
                //document.getElementById("AvlQty").value = data[i].Qty;
                document.getElementById("UNIT").value ="";
                document.getElementById("UnitPrice").value ="";
                document.getElementById("Location").value ="";
                document.getElementById("SubLocation").value = "";
                document.getElementById("MinQty").value = "";
                document.getElementById("Make").value = "";
                document.getElementById("Area").value = "";
                document.getElementById("Total_Qty").value = "";
                //document.getElementById("Oldtotalpricevalue").value = "";
                document.getElementById("hidtotalqty").value = "";
                // Clearing category field value
                document.getElementById("Category").value = "";
            }
        }
    })
}


//function GetMaterialDatabyNewUMC(New_UMC) {
//    debugger
//    var newwmc = New_UMC;

//    //var status = 1;

//    $.ajax({
//        url: '/api/Inventory/GetMatIssuebyNewUMC',
//        method: 'POST',

//        data: { New_UMC: newwmc },
//        dataType: 'json',
//        onbeforeUnload: function () {
//            // document.getElementById("plzwt").value = "Login Please Wait..";
//        },
//        success: function (response) {
//            debugger
//            //$("#LogForm")[0].reset();
//            var data = JSON.parse(response);
//            if (data[0] != null) {
//                for (var i = 0; i < data.length; i++) {

//                    document.getElementById("Item_Desc").value = data[i].item_desc;
//                    document.getElementById("UMC_No").value = data[i].umc_no;
//                    //document.getElementById("PartNo").value = data[i].part_no;
//                    //document.getElementById("AvlQty").value = data[i].Qty;
//                    document.getElementById("UNIT").value = data[i].unit;
//                    var text = "<option value=" + data[i].location + ">" + data[i].location + "</option>"
//                    document.getElementById("Location").append = text;
//                    //document.getElementById("Location").innerText = data[i].Location;
//                    document.getElementById("SubLocation").value = data[i].sub_location;
//                    document.getElementById("MinQty").value = data[i].min_qty;
//                    document.getElementById("Make").value = data[i].make;
//                    document.getElementById("Area").value = data[i].area;
//                    //document.getElementById("Total_Qty").value = data[i].qty;
//                    //document.getElementById("hidtotalqty").value = data[i].qty;
//                    document.getElementById("Category").value = data[i].category;

//                    $.ajax({
//                        url: '/api/Inventory/GetTotalQtybyNewUmc',
//                        method: 'POST',
//                        data: { New_UMC: newwmc },
//                        dataType: 'json',
//                        success: function (totalQtyResponse) {
//                            document.getElementById("Total_Qty").value = totalQtyResponse.totalQty;
//                        }
//                    });

//                    //// Populating Category dropdown
//                    //var text = "<option value='" + data[i].category + "'>" + data[i].category + "</option>"; 
//                    //$("#Category").html(text); 
//                }

//            }
//            else {
//                document.getElementById("Item_Desc").value = "";
//                document.getElementById("UMC_No").value = "";
//                //document.getElementById("PartNo").value ="";
//                //document.getElementById("AvlQty").value = data[i].Qty;
//                document.getElementById("UNIT").value = "";
//                document.getElementById("Location").value = "";
//                document.getElementById("SubLocation").value = "";
//                document.getElementById("MinQty").value = "";
//                document.getElementById("Make").value = "";
//                document.getElementById("Area").value = "";
//                document.getElementById("Total_Qty").value = "";
//                document.getElementById("hidtotalqty").value = "";
//                document.getElementById("Category").value = "";
//            }
//        }
//    })
//}


//function GetMaterialDatabyItemdescription(Item_Desc) {
//    debugger
//    var itemdesc = Item_Desc;

//    //var status = 1;

//    $.ajax({
//        url: '/api/Inventory/GetMatIssuebyItemdescription',
//        method: 'POST',

//        data: { Item_Desc: itemdesc },
//        dataType: 'json',
//        onbeforeUnload: function () {
//            // document.getElementById("plzwt").value = "Login Please Wait..";
//        },
//        success: function (response) {
//            debugger
//            //$("#LogForm")[0].reset();
//            var data = JSON.parse(response);
//            if (data[0] != null) {
//                for (var i = 0; i < data.length; i++) {

//                    document.getElementById("New_UMC").value = data[i].new_umc;
//                    document.getElementById("UMC_No").value = data[i].umc_no;
//                    //document.getElementById("PartNo").value = data[i].part_no;
//                    //document.getElementById("AvlQty").value = data[i].Qty;
//                    document.getElementById("UNIT").value = data[i].unit;
//                    var text = "<option value=" + data[i].location + ">" + data[i].location + "</option>"
//                    document.getElementById("Location").append = text;
//                    //document.getElementById("Location").innerText = data[i].Location;
//                    document.getElementById("SubLocation").value = data[i].sub_location;
//                    document.getElementById("MinQty").value = data[i].min_qty;
//                    document.getElementById("Make").value = data[i].make;
//                    document.getElementById("Area").value = data[i].area;
//                    //document.getElementById("Total_Qty").value = data[i].qty;
//                    //document.getElementById("hidtotalqty").value = data[i].qty;
//                    document.getElementById("Category").value = data[i].category;

//                    $.ajax({
//                        url: '/api/Inventory/GetTotalQtybyItemdescription',
//                        method: 'POST',
//                        data: { Item_Desc: itemdesc },
//                        dataType: 'json',
//                        success: function (totalQtyResponse) {
//                            document.getElementById("Total_Qty").value = totalQtyResponse.totalQty;
//                        }
//                    });

//                    //// Populating Category dropdown
//                    //var text = "<option value='" + data[i].category + "'>" + data[i].category + "</option>"; 
//                    //$("#Category").html(text); 
//                }

//            }
//            else {
//                document.getElementById("New_UMC").value = "";
//                document.getElementById("UMC_No").value = "";
//                //document.getElementById("PartNo").value ="";
//                //document.getElementById("AvlQty").value = data[i].Qty;
//                document.getElementById("UNIT").value = "";
//                document.getElementById("Location").value = "";
//                document.getElementById("SubLocation").value = "";
//                document.getElementById("MinQty").value = "";
//                document.getElementById("Make").value = "";
//                document.getElementById("Area").value = "";
//                document.getElementById("Total_Qty").value = "";
//                document.getElementById("hidtotalqty").value = "";
//                document.getElementById("Category").value = "";
//            }
//        }
//    })
//}

function generateRandomBarcode() {
    var prefix = "CRM";
    var serialNumberLength = 7; // Total length of serial number
    var serialNumber = generateSerialNumber(serialNumberLength);
    var barcodeData = prefix + serialNumber;
    return barcodeData;
}

function generateSerialNumber(length) {
    var serialNumber = "";
    for (var i = 0; i < length; i++) {
        serialNumber += Math.floor(Math.random() * 10); 
    }
    return serialNumber;
}

var barcode = generateRandomBarcode();
console.log(barcode); // Output: CRM1234567 (example)



function MatReceiveDataInsert() {
    debugger
    var reservationno = document.getElementById("Reservation_No").value;
    var Item_Desc = document.getElementById("Item_Desc").value;
    var UMC_No = document.getElementById("UMC_No").value;
    var New_UMC = document.getElementById("New_UMC").value;
    var Reservation_Qty = document.getElementById("Reservation_Qty").value;
    var Qty_Receive = document.getElementById("QtyReceive").value;
    var UnitPrice = document.getElementById("UnitPrice").value;
    var TotalPrice = document.getElementById("TotalPrice").value;
    var Total_Qty = document.getElementById("Total_Qty").value;
    var UNIT = document.getElementById("UNIT").value;
    var Requester_Name = document.getElementById("Requester_Name").value;
    var Receive_Date = document.getElementById("Receive_Date").value;
    var Remarks = document.getElementById("Remarks").value;
    var Entry_Date = document.getElementById("Entry_Date").value;
    var Make = document.getElementById("Make").value;
    var Area = document.getElementById("Area").value;
    var Location = document.getElementById("Location").value;
    var MinQty = document.getElementById("MinQty").value;
    var SubLocation = document.getElementById("SubLocation").value;
    var Category = document.getElementById("Category").value;
    var Equipment = document.getElementById("Equipment").value;

    CentralStore_Item = document.getElementById("CentralStore_Item").checked;
    //var CentralStore_Item = document.getElementById("CentralStore_Item").value;
    //var CentralStore_Item = document.getElementById("CentralStore_Item").checked ? 1 : 0;

    //var Hiddentotalprice = document.getElementById("MultiplicationValue").value;
    //var Oldtotalpricevalue = document.getElementById("Oldtotalpricevalue").value;

    debugger

    if ( Item_Desc != "" && UMC_No != ""  && Qty_Receive != "" && UnitPrice != "" && TotalPrice != "" && Total_Qty != "" && UNIT != ""  && Receive_Date != ""  && Entry_Date != ""  && Location != "" ) {
        debugger

        //console.log("Location:", Location);
        //var loc = Location.split("+");
        //var locname = loc[1];
        //console.log("Location Name:", locname);

        var Location = document.getElementById("Location").value;

        var data = {
            Reservation_No: reservationno,
            Item_Desc: Item_Desc,
            UMC_No: UMC_No,
            New_UMC: New_UMC,
            Reservation_Qty: Reservation_Qty,
            Qty_Receive: Qty_Receive,
            Total_Qty: Total_Qty,
            UNIT: UNIT,
            Requester_Name: Requester_Name,
            Receive_Date: Receive_Date,
            Remarks: Remarks,
            Entry_Date: Entry_Date,
            UnitPrice: UnitPrice,
            TotalPrice: TotalPrice,
            Make: Make,
            Area: Area,
            //Location: locname,
            Location: Location,
            SubLocation: SubLocation,
            Category: Category,
            MinQty: MinQty,
            CentralStore_Item: CentralStore_Item,
            Equipment: Equipment,
            BarcodeID: barcode 
            //ID: generateUniqueID()
            //Hiddentotalprice: Hiddentotalprice,
            //Oldtotalpricevalue: Oldtotalpricevalue

        };
      
        $.ajax({
            url: '/api/Inventory/InsertMaterialData',
            dataType: 'json',
            data: data,
            type: 'Post',
            success: function (response) {
                debugger
                if (response == true) {
                    location.reload();
                    alert("Material Saved Successfully");
                } else {
                    alert("Something went Wrong!!");
                }
            }
        });
      
    } else {
        alert("Please Fill up all the fields");
    }
}

//material data insert by excel sheet bulk entry

function Upload()
{
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");




    //Validate whether File is valid Excel file.

   // var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
   
    
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+([^)]+)\)+(.xls|.xlsx)$/;



    if (regex.test(fileUpload.value.toLowerCase()))
    {
        if (typeof (FileReader) != "undefined")
        {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString)
            {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else
                {
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
        }    else {
            alert("This browser does not support HTML5.");
        }
    }

    else
    {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase()))
        {

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
            }
            else
            {
                alert("This browser does not support HTML5.");
            }

        }
        else
        {
            alert("Please upload a valid Excel file.");
        }
       
        
    }
}

function ProcessExcel(data) {
    var UMCNO = [];
    var ItemDesc = [];
    var UOM = [];
    var Reservation_Qty = [];
    var Qty_Receive = [];
    var Unit_Price = [];
    var Reservation_No = [];
    var Requester_Name = [];
    var Area = [];
    var Location = [];
    var Sub_Location = [];
    var Category = [];
    var Entry_Date = [];
    var Total_Qty = [];
    var Total_Price = [];
    var Receive_Date = [];
    var Remarks = [];
    var Make = [];
    var MinQty = [];
   // var BarcodeID = [];
    var workbook = XLSX.read(data, {
        type: 'binary'
    });
    var firstSheet = workbook.SheetNames[0];
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    for (var i = 0; i < excelRows.length; i++) {
        UMCNO.push(excelRows[i].UMC_NO);
        ItemDesc.push(excelRows[i].Item_Desc);
        UOM.push(excelRows[i].UOM);
        Reservation_Qty.push(excelRows[i].Reservation_Qty);
        Qty_Receive.push(excelRows[i].Qty_Receive);
        Unit_Price.push(excelRows[i].Unit_Price);
        Reservation_No.push(excelRows[i].Reservation_No);
        Requester_Name.push(excelRows[i].Requester_Name);
        Area.push(excelRows[i].Area);
        Location.push(excelRows[i].Location);
        Sub_Location.push(excelRows[i].Sub_Location);
        Category.push(excelRows[i].Category);
        Entry_Date.push(excelRows[i].Entry_Date);
        Total_Qty.push(excelRows[i].Total_Qty);
        Total_Price.push(excelRows[i].Total_Price);
        Receive_Date.push(excelRows[i].Receive_Date);
        Remarks.push(excelRows[i].Remarks);
        Make.push(excelRows[i].Make);
        MinQty.push(excelRows[i].MinQty);
       // BarcodeID.push(excelRows[i].BarcodeID);
    }
    var dataa = {
        UMCNO1: UMCNO,
        Item_Desc1: ItemDesc,
        UOM1: UOM,
        Reservation_Qty1: Reservation_Qty,
        Qty_Receive1: Qty_Receive,
        Unit_Price1: Unit_Price,
        Reservation_No1: Reservation_No,
        Requester_Name1: Requester_Name,
        Area1: Area,
        Location1: Location,
        Sub_Location1: Sub_Location,
        Category1: Category,
        Entry_Date1: Entry_Date,
        Total_Qty1: Total_Qty,
        Total_Price1: Total_Price,
        Receive_Date1: Receive_Date,
        Remarks1: Remarks,
        Make1: Make,
        MinQty1: MinQty
        //BarcodeID1: BarcodeID
    }; 
    $.ajax({
        url: '/api/Inventory/UploadBulkMaterial',
        method: 'POST',
        data: dataa,
        dataType: 'json',
        success: function (response) {
            console.log(response); 
            if (response === "Successful") {
                location.reload();
                alert("Excel Uploaded Successfully");
            } else {
                location.reload();
                alert("Failed to save material data. Please try again.");
            }
        },
        error: function () {
            location.reload();
            alert("An error occurred while processing the data. Please try again.");
        }
    });
}




    	

