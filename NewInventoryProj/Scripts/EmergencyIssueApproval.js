$(document)
    .ready(function () {

        $.ajax({                                             //
            url: '/api/Inventory/BindMaterialIssueRequest',
            type: 'POST',
            datatype: 'json',
            //data: { ofst: flag, fetch: 1, user: user },
            success: function (data) {

                $('#ApproveData').find('tbody').empty();
                $.each(JSON.parse(data), function (i, val) {


                    var text = "<tr><td>"
                        + val.Sno
                        + "</td><td>"
                        + val.UMC_No
                        + "</td><td>"
                        + val.ToolName
                        + "</td><td>"
                        + val.ToolQty
                        + "</td><td>"
                        + val.EmergencyIssueQty
                        + "</td>"
                        + "<td> "
                        + val.IssuierId
                        + "</td><td>"
                        + '<div class="row">'
                        + '<a href = "#" id = "' + val.UMC_No + '-1-' + val.EmergencyIssueQty + '-' + val.IssuierId+'" onclick = "ApproveData(this.id)" class="btn btn-success" style = "width:15%" data - toggle="tooltip" data - placement="bottom" data - html="true"  title = "Approve"> <i class="fa fa-check" style="margin-left:-6px;"></i></a >'
                        + '<a href = "#" id = "' + val.UMC_No + '-2-' + val.EmergencyIssueQty + '-' + val.IssuierId+'" onclick = "RejectData(this.id)" class="btn btn-danger" style = "width:15%" data - toggle="tooltip" data - placement="bottom" data - html="true"  title = "Reject"> <i class="fa fa-times" style="margin-left:-6px;"></i></a >'
                           +'</div >'
                        + "</td></tr > ";
                    //alert(text);						
                    $('#ApproveData').find('tbody').append(text);
                   
                });
                $(document)
                    .ready(function () {
                        $('#ApproveData').dataTable(
                            {
                                // parameters
                                // "scrollY": 400,
                                "lengthMenu": [[10, 15, 20, -1],
                                [10, 15, 20, "All"]],
                                autoWidth: false,
                                responsive: true,
                                "scrollX": true,

                                "drawCallback": function (settings) {

                                    $('[data-toggle="tooltip"]').tooltip({
                                        container: 'body'
                                    })


                                    // add as many tooltips you want

                                },
                            });
                    });

            }
        });


    });


//approve issue request from emergency
function ApproveData(UMC_No) {
    debugger
    var umcno = UMC_No.split('-');
    var umcno1 = umcno[0];
    var status = umcno[1];
    var issueqty = umcno[2];
    var issueierid = umcno[3];
    var data = { UMC_No: umcno1, TempData: status, EmergencyIssueQty: issueqty, IssuierId: issueierid };

    //var status = document.getElementById(id).value;
    $.ajax({
        url: '/api/Inventory/ApproveRequestIssue',
        method: 'POST',

        data: data,
        dataType: 'json',
        onbeforeUnload: function () {
            document.getElementById("plzwt").value = "Login Please Wait..";
        },
        success: function (response) {
            debugger
            //$("#LogForm")[0].reset();
            //var data = JSON.parse(response);
            if (response == true) {
                window.location.href = "/Home/EmergencyApproval";
                alert("Update Successful");
            }
            else {
                alert("Something Wrong ! Please Contact Adminstrator");
            }




        }
    })
}


//reject issue request from emergency

function RejectData(UMC_No) {
    debugger
    var umcno = UMC_No.split('-');
    var umcno1 = umcno[0];
    var status = umcno[1];
    var issueqty = umcno[2];
    var data = { UMC_No: umcno1, TempData: status, EmergencyIssueQty: issueqty, IssuierId: issueierid  };
    //var status = document.getElementById(id).value;
    $.ajax({
        url: '/api/Inventory/ApproveRequestIssue',
        method: 'POST',

        data: data,
        dataType: 'json',
        onbeforeUnload: function () {
            document.getElementById("plzwt").value = "Login Please Wait..";
        },
        success: function (response) {
            debugger
            //$("#LogForm")[0].reset();
            //var data = JSON.parse(response);
            if (response == true) {
                window.location.href = "/Home/EmergencyApproval";
                alert("Update Successful");
            }
            else {
                alert("Something Wrong ! Please Contact Adminstrator");
            }




        }
    })
}
