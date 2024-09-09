$(document).ready(function () {
    var showCentralStoreItems = false;
    var storeDataTable;

    $('#CentralStore_Item').change(function () {
        showCentralStoreItems = $(this).is(':checked');
        fetchDataFromAPI(showCentralStoreItems);
    });

    function fetchDataFromAPI(showCentralStoreItems) {
        $.ajax({
            url: '/api/Inventory/BindAvailableStoreData?showCentralStoreItems=' + showCentralStoreItems,
            type: 'POST',
            datatype: 'json',
            beforeSend: function () {
                $("#loader").html("<span class='fa fa-spin'><span class='fa fa-spinner'></span></span>Loading...Please Wait !");
            },
            success: function (data) {
                if ($.fn.dataTable.isDataTable('#storeData')) {
                    storeDataTable.destroy(); // Destroy the existing DataTable
                }

                $("#loader").hide();
                $('#storeData').find('tbody').empty();

                $.each(JSON.parse(data), function (i, val) {
                    var slno = i + 1;
                    var text = "<tr contenteditable='false' onclick='getdetails(\"" + val.umc_no + "\",\"" + val.location + "\",\"" + val.sub_location + "\")'><td  contenteditable='false'>"
                        + slno
                        + "</td><td  contenteditable='false'>"
                        + val.umc_no
                        + "</td><td  contenteditable='false'>"
                        + val.item_desc
                        + "</td><td  contenteditable='false'>"
                        + val.location
                        + "</td><td  contenteditable='false'>"
                        + val.sub_location
                        + "</td> <td  contenteditable='false'>"
                        + val.category
                        + "</td><td  contenteditable='false'>"
                        + val.area
                        + "</td><td  contenteditable='false'>"
                        + val.Equipment
                        + "</td><td  contenteditable='false'>"
                        + val.qty
                        + "</td></tr>";
                    $('#storeData').find('tbody').append(text);
                });

                storeDataTable = $('#storeData').DataTable({
                    "lengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
                    autoWidth: true,
                    responsive: true
                });
            }
        });
    }

    // Initial API call without filtering
    fetchDataFromAPI(showCentralStoreItems);
});

//$(document).ready(function () {
  
//        $.ajax({                                           
//            url: '/api/Inventory/BindAvailableStoreData',
//            type: 'POST',
//            datatype: 'json',
//            beforeSend: function () {
//                $("#loader").html("<span class='fa fa-spin'><span class='fa fa-spinner'></span></span>Loading...Please Wait !");
//            },

//            success: function (data) {
//                $("#loader").hide();
//                $('#storeData').find('tbody').empty();
//              debugger
//                $.each(JSON.parse(data), function (i, val) {

//                    var slno = i + 1;
//                    var text = "<tr contenteditable='false' onclick='getdetails(\"" + val.umc_no + "\",\"" + val.location + "\",\"" + val.sub_location + "\")'><td  contenteditable='false'>"
//                        + slno
//                        + "</td><td  contenteditable='false'>"
//                        + val.umc_no
//                        + "</td><td  contenteditable='false'>"
//                        + val.item_desc
//                        + "</td><td  contenteditable='false'>"
//                        + val.location
//                        + "</td><td  contenteditable='false'>"
//                        + val.sub_location
//                        + "</td> <td  contenteditable='false'>"
//                        + val.category
//                        + "</td><td  contenteditable='false'>"
//                        + val.area
//                        + "</td><td  contenteditable='false'>"
//                        + val.qty
//                        + "</td></tr>";				
//                    $('#storeData').find('tbody').append(text);
//                });
//                 $('#storeData').dataTable(
//                 {
//                        "lengthMenu": [[10, 15, 20, -1],
//                        [10, 15, 20, "All"]],
//                        autoWidth: true,
//                         responsive: true,
//                        "drawCallback": function (settings) {

//                        },
//                 });
//            }
//        });
//});

function getdetails(umcno, location, sub_location) {
    var umcno = umcno;
    var location = location;
   // var sublocationValue = sublocation || 'N/A'; 
    var sub_location = sub_location;
    $.ajax({
        url: '/api/Inventory/GetDetailsOfMaterial',
        type: 'POST',
        datatype: 'json',
        data: { umc_no: umcno, location: location, sub_location: sub_location },
        beforeSend: function () {

        },
        success: function (data) {
           // $('#largeModal').modal('show');
         
            var dataa = JSON.parse(data);
            document.getElementById("reservation_no").innerHTML = "";
            document.getElementById("umc_no").innerHTML = "";
            document.getElementById("item_Desc").innerHTML = "";
            document.getElementById("new_umc").innerHTML = "";
            document.getElementById("qty_present").innerHTML = "";
            document.getElementById("qty_reserved").innerHTML = "";
            document.getElementById("location").innerHTML = "";
            document.getElementById("sublocation").innerHTML = "";
            document.getElementById("Qtyreceivedtillnow").innerHTML = "";
            document.getElementById("unitprice").innerHTML = "";
            document.getElementById("category").innerHTML = "";
            document.getElementById("orderedby").innerHTML = "";
            document.getElementById("receiveddate").innerHTML = "";
            document.getElementById("entrydate").innerHTML = "";
            for (var i = 0; i < dataa.length; i++) {

                var date = new Date(dataa[i].Entry_Date1);
                var EntryDate = date.getDate() + "-";

                if (date.getMonth() == 12) {
                    EntryDate = EntryDate + "-1-";
                } else {
                    var m = date.getMonth() + 1;
                    EntryDate = EntryDate + m + "-";
                }
                EntryDate = EntryDate + date.getFullYear();

                var date2 = new Date(dataa[i].Receive_Date);
                var RecvDate = date2.getDate() + "-";

                if (date2.getMonth() == 12) {
                    RecvDate = RecvDate + "-1-";
                } else {
                    var m = date2.getMonth() + 1;
                    RecvDate = RecvDate + m + "-";
                }
                RecvDate = RecvDate + date2.getFullYear();

                document.getElementById("reservation_no").innerHTML = dataa[i].Reservation_No;
                document.getElementById("umc_no").innerHTML = dataa[i].umc_no;
                document.getElementById("item_Desc").innerHTML = dataa[i].item_desc;
                document.getElementById("new_umc").innerHTML = dataa[i].new_umc;
                document.getElementById("qty_present").innerHTML = dataa[i].qty;//QuantityPresent
                document.getElementById("qty_reserved").innerHTML = dataa[i].Reservation_Qty;
                document.getElementById("location").innerHTML = dataa[i].location;
                //document.getElementById("sublocation").innerHTML = dataa[i].sub_location;
                if (dataa[i].sub_location) {
                    document.getElementById("sublocation").innerHTML = dataa[i].sub_location;
                } else {
                    document.getElementById("sublocation").innerHTML = "N/A";
                }
                ////document.getElementById("part_no").innerHTML = dataa[i].part_no;
                //document.getElementById("qty_reserved").innerHTML = dataa[i].Reservation_Qty;
                ////document.getElementById("qty_received").innerHTML = dataa[i].Qty_Receive;//QuantityReceived
                //document.getElementById("qty_present").innerHTML = dataa[i].qty;//QuantityPresent
                document.getElementById("Qtyreceivedtillnow").innerHTML = dataa[i].total_qty_till;//Total Qty Received Till Now
                document.getElementById("unitprice").innerHTML = dataa[i].unit_price;//Unit_Price
                document.getElementById("category").innerHTML = dataa[i].category;
                document.getElementById("orderedby").innerHTML = dataa[i].Requester_Name;
                document.getElementById("receiveddate").innerHTML = RecvDate;
                document.getElementById("entrydate").innerHTML = EntryDate;
               
            }
            $('#dummyModal').modal('show');
        }
    })
    
}


$('.edit').click(function () {
    var row = $(this).closest('tr');
    row.toggleClass('isediting'); // add a style to highlight the row
    var isediting = row.hasClass('isediting');
    $(this).parent('td').siblings('td').prop('contenteditable', isediting);
    if (isediting) {
        $(this).text('update');
    } else {
        $(this).text('edit');
    }
})