$(document).ready(function () {

    $.ajax({                                             //
        url: '/api/Inventory/BindAllService',
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
                // Format Entry Date
                var entryDate = new Date(val.Entry_Date);
                var entryDateFormatted = entryDate.getDate() + "-";

                if (entryDate.getMonth() == 12) {
                    entryDateFormatted += "-1-";
                } else {
                    var m = entryDate.getMonth() + 1;
                    entryDateFormatted += m + "-";
                }

                entryDateFormatted += entryDate.getFullYear();

                var slno = i + 1;

                var text = "<tr><td>"
                    + slno
                    + "</td><td>"
                    + val.ARC_No
                    + "</td><td>"
                    + val.Usc
                    + "</td><td>"
                    + val.UscDetails
                    + "</td><td>"
                    + val.Vendor_Name
                    + "</td><td>"
                    + val.Service_Type
                    + "</td><td>"
                    + val.Unit
                    + "</td><td>"
                    + val.Price
                    + "</td><td>"
                    + val.Service_Cost
                    + "</td><td>"
                    + val.Remark
                    //+ "</td><td>"
                    //+ val.Tolength
                    + "</td><td>"
                    + entryDateFormatted
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