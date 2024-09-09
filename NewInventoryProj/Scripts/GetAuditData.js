function GetAuditData() {
   
    var sublocation = document.getElementById("SubLocation").value;
    //var date = document.getElementById("fromDate").value;
    //var location = document.getElementById("Location").value;
    //var fromdate = document.getElementById("fromDate").value;
    //var ToDate = document.getElementById("ToDate").value;
    $.ajax({
        url: '/api/Inventory/GetStoreAuditData',
        data: { Sub_Location: sublocation },
        method: 'Post',
        dataType: 'json',
        beforeSend: function () {
           

        },
        success: function (response) {
            
            $('#msg').hide();
            $('#Auditdata').find('tbody').empty();
            //$("#LogForm")[0].reset(); Sno,UMC,NewUMC,ItemDesc,PartNo.Qty
            $.each(JSON.parse(response), function (i, val) {

                var text = "<tr style='background-color: #ffffff !important;'>";

                text = text
                    + "<td style= 'text-align: left;'>  <a href='#' class = 'make'>"
                    + val.sno
                    + "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'make'>"
                    + val.umc_no
                    + "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'make'>"
                    + val.new_umc
                    + "</a></td><td class = ''>"
                    + val.item_desc
                    + "</td><td style= 'text-align: left;'>  <a href='#' class = 'itemDesc'>"
                    + val.part_no
                    + "</a></td> <td class = 'Part_No' style= ''>"
                    + val.qty
                    + "</a></td>"
                    + "<td><button id='" + val.sno + "+" + val.umc_no + "+" + val.qty + "' onclick='AuditDataPresent(id)'><i class='fa fa-check'></i></button><button id='" + val.Sno + "+" + val.UMC_No + "+" + val.Qty + "'><i class='fa fa-times'></i></button></td>"
                        + "</tr>"

                $('#Auditdata').find('tbody').append(text);
            });
            $('#Auditdata').dataTable(
                {
                    // parameters
                    // "scrollY": 400,
                    "lengthMenu": [[10, 15, 20, -1],
                    [10, 15, 20, "All"]],
                    autoWidth: true,
                    responsive: true,


                    "drawCallback": function (settings) {

                        //$('[data-toggle="tooltip"]').tooltip({
                        //    container: 'body'
                        //})


                        // add as many tooltips you want

                    },
                });
        }
    });
   
}


function AuditDataPresent(id) {
    debugger
    //var date = document.getElementById("fromDate").value;
    //if (date == "") {
    //    alert("please enter Date");
    //}
    //else {


        var data = id.split("+");
        var sno = data[0];
        var UmcNo = data[1];
        var Qty = data[2];


        var datapost = { Sno: sno, UMC_No: UmcNo, Qty: Qty };

        $.ajax({
            url: '/api/Inventory/InsertAuditData',
            data: datapost,
            type: 'json',
            method: 'POST',
            success: function (response) {
                if (response == true) {
                    alert("Audit Successful");
                }
                else {
                    alert("something went wrong! PLEASE CONTACT TO ADMIN");
                }
            }
        })
    //}
}