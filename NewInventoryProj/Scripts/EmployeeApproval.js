$(document).ready(function bindemployee() {

    $.ajax({                                           
        url: '/api/Inventory/BindAllEmployee',
        type: 'POST',
        datatype: 'json',
        beforeSend: function () {
            $("#loader").html("<span class='fa fa-spin'><span class='fa fa-spinner'></span></span>Loading...Please Wait !");
        },
        success: function (data) {
            $("#loader").hide();
            $('#EmployeeData').find('tbody').empty();
            debugger
            $.each(JSON.parse(data), function (i, val) {              
                var st1;
                var slno = i + 1;
                if (val.Status == 1) {
                    st1 = "<span class='label label-success'>Approved</span>"
                }
                else if (val.Status == 0) {
                    st1 = "<span class='label label-danger'>Pending</span>"
                }
                else if (val.Status == 2) {
                    st1 = "<span class='label label-warning'>Rejected</span>"
                }
                var text = "<tr><td>" + slno + "</td><td>"
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
                    + '<div class="row" style="margin-left:0%">' +
                    '<a href="#" id="' + val.Personal_No + '" onclick="ApproveData(this.id)" class="btn btn-success " style="width:15%" data-toggle="tooltip" data-placement="bottom" data-html="true" title="Approve"><i class="fa fa-check" style="margin-left:-6px;"></i></a>' +
                    '<a href = "#" id = "' + val.Personal_No + '"  onclick="RejectData(this.id)" class="btn  btn-danger " style="width:15%" data-toggle="tooltip" data-placement="bottom" data-html="true" title="Reject"><i class="fa fa-times" style="margin-left:-6px;" ></i></a>' +
                    //'<a href="#" id="' + val.Personal_No + '" onclick="DeleteData(this.id)" class="btn btn-danger" style="width:15%" data-toggle="tooltip" data-placement="bottom" data-html="true" title="Delete"><i class="fa fa-trash" style="margin-left:-6px;"></i></a>' +
                    '</div > '
                    + "</td><td>" +
                    '<button onclick="editEmployeeDetails(\'' + val.Personal_No + '\', \'' + val.Name + '\', \'' + val.Password + '\', \'' + val.Category + '\', \'' + val.Email + '\', \'' + val.Mobile + '\')" class="btn btn-primary" data-toggle="modal" data-target="#editEmployeeModal">Edit</button>' 
                    "</td></tr>";		
                $('#EmployeeData').find('tbody').append(text);
            });
            $('#EmployeeData').dataTable(
                {
                    "lengthMenu": [[10, 15, 20, -1],
                    [10, 15, 20, "All"]],
                    autoWidth: false,
                    responsive: true,
                    "scrollX": true,

                    "drawCallback": function (settings) {

                    },
                });
        }
    });
});
function editEmployeeDetails(Personal_No, Name, Password, Category, Email, Mobile) {
    $('#editPersonalNo').val(Personal_No);
    $('#editName').val(Name);
    $('#editPassword').val(Password);
    $('#editCategory').val(Category);
    $('#editEmail').val(Email);
    $('#editMobile').val(Mobile);
}

// Function to save changes to employee details
$('#saveChanges').on('click', function () {
    var Personal_No = $('#editPersonalNo').val();
    var Name = $('#editName').val();
    var Password = $('#editPassword').val();
    var Category = $('#editCategory').val();
    var Email = $('#editEmail').val();
    var Mobile = $('#editMobile').val();

    var data = {
        Personal_No: Personal_No,
        Name: Name,
        Password: Password,
        Category: Category,
        Email: Email,
        Mobile: Mobile
    };

    $.ajax({
        url: '/api/Inventory/UpdateEmployeeDetails',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (response) {
            alert(response); 
            $('#editEmployeeModal').hide();
            location.reload();
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
            alert("Failed to update employee details. Check the console for more information.");
        }
    });
});

 function RejectData(id) {
            debugger
            var id1 = id;
            var sts = 0;
            $.ajax({
                url: '/api/Inventory/ApproveEMployee',
                method: 'POST',
                data: { Personal_No: id1, Status: sts },
                dataType: 'json',
                onbeforeUnload: function () {
                    document.getElementById("plzwt").value = "Login Please Wait..";
                },
                success: function (response) {
                    debugger
                    var data = JSON.parse(response);
                    if (data == true) {
                        window.location.href = "/Home/EmployeeList";
                        alert("Update Successful");
                    }
                    else {
                        alert("Something Wrong ! Please Contact Adminstrator");
                    }
                }
            })
     bindemployee();
 }
 function ApproveData(id) {
            debugger
            var id1 = id;
            var status = 1;
            $.ajax({
                url: '/api/Inventory/ApproveEMployee',
                method: 'POST',
                data: { Personal_No: id1, Status: status },
                dataType: 'json',
                onbeforeUnload: function () {
                    document.getElementById("plzwt").value = "Login Please Wait..";
                },
                success: function (response) {
                    debugger
                    var data = JSON.parse(response);
                    if (data == true) {
                        window.location.href = "/Home/EmployeeList";
                        alert("Update Successful");
                    }
                    else {
                        alert("Update UnSuccessful");
                    }
                }
            })
            bindemployee();
 }


//function DeleteData(id) {
//    debugger
//    var id1 = id;
//    var IsDeleted = 1;
//    $.ajax({
//        url: '/api/Inventory/DeleteEmployeeee',
//        method: 'POST',
//        data: { Personal_No: id1, IsDeleted: IsDeleted },
//        dataType: 'json',
//        onbeforeUnload: function () {
//            document.getElementById("plzwt").value = "Login Please Wait..";
//        },
//        success: function (response) {
//            debugger
//            var data = JSON.parse(response);
//            if (data == true) {
//                window.location.href = "/Home/EmployeeList";
//                alert("Delete Successful");
//            }
//            else {
//                alert("Something Wrong ! Please Contact Adminstrator");
//            }
//        }
//    })
//    bindemployee();
//}
