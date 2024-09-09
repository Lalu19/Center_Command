$(document).ready(function () {

    $.ajax({                                             //
        url: '/api/Inventory/BindAllEmployee',
        type: 'POST',
        datatype: 'json',
        //data: { ofst: flag, fetch: 1, user: user },
        beforeSend: function () {
            $("#loader").html("<span class='fa fa-spin'><span class='fa fa-spinner'></span></span>Loading...Please Wait !");
        },
        success: function (data) {
            
            $("#loader").hide();
            $('#EmployeeData').find('tbody').empty();
            
            $.each(JSON.parse(data), function (i, val) {

                var st1;
                if (val.Status == 1) {
                    st1 = "<span class='label label-success'>Approved</span>"
                }
                else if (val.Status == 0) {
                    st1 = "<span class='label label-danger'>Pending</span>"
                }
                else if (val.Status == 2) {
                    st1 = " <span class='label label - warning'>Rejected</span>"
                }
                //}
                var text = "<tr><td>"
                    + val.Personal_No
                    + "</td><td>"
                    + val.Name
                    + "</td><td>"
                    + val.Mobile
                    + "</td><td>"
                    + val.Email
                    + "</td> <td>"
                    + val.Category
                    + "</td><td>"
                    + st1

                + "</td><td>"
                    + '<div class="row" style="margin-left:0%">'+

                    '<a href="#" id="'+val.Personal_No+'" onclick="ApproveData(this.id)" class="btn btn-success " style="width:15%" data-toggle="tooltip" data-placement="bottom" data-html="true" title="Approve"><i class="fa fa-check" style="margin-left:-6px;"></i></a>'+
                    '<a href = "#" id = "' + val.Personal_No + '"  onclick="RejectData(this.id)" class="btn  btn-danger " style="width:15%" data-toggle="tooltip" data-placement="bottom" data-html="true" title="Reject"><i class="fa fa-times" style="margin-left:-6px;" ></i></a>' +
                   '</div > '
                   
                    +"</td></tr>";
                //alert(text);						
                $('#EmployeeData').find('tbody').append(text);
                /* $('#storeData').dataTable();*/
            });
            $('#EmployeeData').dataTable(
                {
                    // parameters
                    // "scrollY": 400,
                    "lengthMenu": [[10, 15, 20, -1],
                    [10, 15, 20, "All"]],
                    autoWidth: true,
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