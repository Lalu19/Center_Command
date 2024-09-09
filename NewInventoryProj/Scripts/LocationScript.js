$(document).ready(function () {

    $.ajax({                                             //
        url: '/api/Inventory/BindAllLocation',
        type: 'POST',
        datatype: 'json',

        //data: { ofst: flag, fetch: 1, user: user },

        beforeSend: function () {
            $("#loader").html("<span class='fa fa-spin'><span class='fa fa-spinner'></span></span>Loading...Please Wait !");
        },

        success: function (data) {
            $("#loader").hide();
            $('#AllLocation').find('tbody').empty();
            debugger
            $.each(JSON.parse(data), function (i, val) {

                var text = "<tr><td>"
                    + val.Location_ID
                    + "</td><td>"
                    + val.Location_Name
                    + "</td>"
                    + "</tr>";
                //alert(text);						
                $('#AllLocation').find('tbody').append(text);
                /* $('#storeData').dataTable();*/
            });
            $('#AllLocation').dataTable(
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
});

//insert new location data to database
function InsertNewLocation() {
    var locationname = document.getElementById("LocationName").value;
    var datastring = { LocationName: locationname };

    $.ajax({
        url: '/api/Inventory/InsertNewLocation',
        method: 'POST',

        data: datastring,
        dataType: 'json',
        onbeforeUnload: function () {
            document.getElementById("plzwt").value = " Please Wait..";
        },
        success: function (data) {
            debugger
            //$("#LogForm")[0].reset();
           
            if (data == true) {
                location.reload();
                alert("Location Add Successful");               
                document.getElementById("LocationName").value = "";
               
            } else {
                alert("Something went Wrong!!");
            }



        }
    })
}