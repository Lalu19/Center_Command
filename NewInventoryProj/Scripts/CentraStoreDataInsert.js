$(document).ready(function () {

        $.ajax({                                             //
            url: '/api/Inventory/FetchAllCentralStoreData',
            type: 'POST',
            datatype: 'json',
            //data: { ofst: flag, fetch: 1, user: user },
            success: function (data) {

                $('#allmatdata').find('tbody').empty();
                $.each(JSON.parse(data), function (i, val) {


                    var text = "<tr><td>"
                        + val.Id
                        + "</td><td>"
                        + val.Plant
                        + "</td><td>"
                        + val.Material
                        + "</td><td>"
                        + val.Storage_location
                        + "</td> <td>"
                        + val.Val_stock
                        + "</td> <td>"
                        + val.UOM
                        + "</td> <td>"
                        + val.ValStckVal
                        + "</td> <td>"
                        + val.ValStckValue
                        + "</td></tr>";
                    				
                    $('#allmatdata').find('tbody').append(text);
                  // $('#allmatdata').dataTable();
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
                        columns: [{
                            width: '50px'
                        }, {
                            width: '50px'
                        }, {
                            width: '50px'
                        }, {
                            width: '50px'
                        }, {
                            width: '50px'
                        }, {
                            width: '50px'
                        }, {
                            width: '50px'
                        }, {
                            width: '50px'
                        }],

                        "drawCallback": function (settings) {

                            $('[data-toggle="tooltip"]')
                                .tooltip({
                                    container: 'body'
                                })


                            // add as many tooltips you want

                        },
                    });

            }
        });


    });


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
    var Material = []; var Storage_location = [];
    var UOM = []; var Plant = []; var Val_stock = []; var ValStckVal = []; var ValStckValue = []; var Requester_Name = [];
    var Area = []; var Location = []; var Sub_Location = []; var Category = [];; var Entry_Date = [];
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

        Plant.push(excelRows[i].Plant);
        Material.push(excelRows[i].Material);
        Storage_location.push(excelRows[i].Storage_location);
        Val_stock.push(excelRows[i].Val_stock);
        UOM.push(excelRows[i].UOM);
        ValStckVal.push(excelRows[i].ValStckVal);        
        ValStckValue.push(excelRows[i].ValStckValue);
      
    }
    //var dataa = {
    //    UMCNO1: UMCNO, Item_Desc1: ItemDesc, UOM1: UOM, Qty_Receive1: Qty_Receive, Reservation_Qty1: Reservation_Qty, Unit_Price1: Unit_Price, Reservation_No1: Reservation_No,
    //    Requester_Name1: Requester_Name, Area1: Area, Location1: Location, Sub_Location1: Sub_Location, Category1: Category, Entry_Date1: Entry_Date
    //}
    var dataa = {
        Plant: Plant, Material: Material, Storage_location: Storage_location, Val_stock: Val_stock, UOM1: UOM, ValStckVal: ValStckVal, ValStckValue: ValStckValue
    }
    $.ajax({
        url: '/api/Inventory/UploadBulkCentralStoreMaterial',
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

function fnExcelReport() {
    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j = 0;
    tab = document.getElementById('allmatdata'); // id of table

    for (j = 0; j < tab.rows.length; j++) {
        tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
    }
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

    return (sa);
}