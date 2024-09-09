function InsertEmployee() {
    debugger
    var Personal_No = document.getElementById("Personal_No").value;
    var Name = document.getElementById("Name").value;
    var Email = document.getElementById("Email").value;
    var Mobile = document.getElementById("Mobile").value;
    var Password = document.getElementById("Password").value;
    //var daata = { EmployeeId: Personal_No, Name: Name, Email: Email, Mobile: Mobile, Password: Password };
   
    if (Personal_No != "" && Password != "") {
        debugger

        var data = {
            EmployeeId: Personal_No,
            Name: Name,
            Email: Email,
            Mobile: Mobile,
            Password: Password,
         

        };

        $.ajax({
            url: '/api/Inventory/InsertEmployee',
            method: 'POST',
            data: data,
            dataType: 'json',
            onbeforeUnload: function () {
                document.getElementById("plzwt").value = " Please Wait..";
            },
            success: function (data) {
                console.log("Response data:", data);
                //$("#LogForm")[0].reset();

                if (data == true) {

                    alert("Registration Apply Successful");
                    window.location = "/Home/Login";

                } else if (data === false) {
                    alert("The Employee ID entered is already in the system");
                } else {
                    alert("Something went wrong");
                }
            }
            //success: function (data) {
            //    console.log("Response data:", data);

            //    if (data === true) {
            //        alert("Registration Apply Successful");
            //        window.location = "/Home/Login";
            //    } else if (data === false) {
            //        alert("Duplicate Employee Id!!");
            //    } else {
            //        alert("Something went wrong");
            //    }
            //},
            //error: function () {
            //    console.log("Error occurred while processing the request");
            //    alert("Error occurred while processing the request");
            //}
        })
    } else {
        alert("Please Fill up all the fields");
    }
   
}
