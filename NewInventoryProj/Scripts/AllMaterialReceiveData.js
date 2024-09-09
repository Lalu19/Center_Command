$(document).ready(function () {

    $.ajax({                                             //
        url: '/api/Inventory/BindAllMaterial',
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
                var date = new Date(val.Receive_Date);
                var Receivedt = date.getDate() + "-";

                if (date.getMonth() == 12) {
                    Receivedt = Receivedt + "-1-";
                } else {
                    var m = date.getMonth() + 1;
                    Receivedt = Receivedt + m + "-";
                }

                Receivedt = Receivedt + date.getFullYear();
                

                var date3 = new Date(val.Entry_Date);
                var Entrydt = date3.getDate() + "-";

                if (date3.getMonth() == 12) {
                    Entrydt = Entrydt + "-1-";
                } else {
                    var m = date3.getMonth() + 1;
                    Entrydt = Entrydt + m + "-";
                }

                Entrydt = Entrydt + date.getFullYear();
                

                var slno = i + 1;

                var text = "<tr><td>"
                    + slno
                    + "</td><td>"
                    + val.UMC_No
                    + "</td><td>"
                    + val.Item_Desc
                    + "</td><td>"
                    + val.Reservation_Qty
                    + "</td> <td>"
                    + val.Qty_Receive
                    + "</td><td>"
                    + val.Total_Qty
                    + "</td><td>"
                    + val.TotalPrice
                    + "</td><td>"
                    + val.UNIT
                    + "</td><td>"
                    + val.Requester_Name
                    + "</td><td>"
                    + val.Remarks
                    + "</td><td>"
                    + Receivedt
                    + "</td><td>"
                    + Entrydt

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