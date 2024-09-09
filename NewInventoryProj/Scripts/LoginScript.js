$(document).ready(function () {
    $("#Login").click(function () {
        var Personal_No = document.getElementById("Personal_No").value;
        var Password = document.getElementById("Password").value;
        var datastring = { Personal_No: Personal_No, Password: Password };

        $.ajax({
            url: '/api/Inventory/Login',
            method: 'POST',
            data: datastring,
            dataType: 'json',
            success: function (response) {
                var data = JSON.parse(response);
                if (data && data.length > 0 && data[0].Status === 1) {
                    $.ajax({
                        method: 'POST',
                        url: '/Home/createSession',
                        data: "sessionvar=" + data[0].Personal_No + "_" + data[0].Category,
                        success: function (data) {
                            window.location.href = "/Home/Index";
                        }
                    });
                } else {
                    handleLoginFailure("Invalid credentials. Please check your Emp ID and Password.");
                }
            },
            error: function (xhr, status, error) {
                handleLoginFailure("An error occurred during login. Please try again later.");
            }
        });

        function handleLoginFailure(message) {
            console.log("Login failed: " + message);
            alert(message);
        }
    });
});



///////Old code 

//$(document).ready(function () {
//    $("#Login").click(function () {

//        var Personal_No = document.getElementById("Personal_No").value;
//        var Password = document.getElementById("Password").value;
//        var datastring = { Personal_No: Personal_No, Password: Password };

//        $.ajax({
//            url: '/api/Inventory/Login',
//            method: 'POST',

//            data: datastring,
//            dataType: 'json',
//            onbeforeUnload: function () {
//                document.getElementById("plzwt").value = "Login Please Wait..";
//            },
//            success: function (response) {

//                //$("#LogForm")[0].reset();
//                var data = JSON.parse(response);
//                if (data[0].Status == 1) {
//                    $.ajax({
//                        method: 'POST',
//                        url: '/Home/createSession',
//                        data: "sessionvar=" + data[0].Personal_No + "_" + data[0].Category,

//                        success: function (data) {

//                            window.location.href = "/Home/Index";

//                        }
//                    });
//                }

//            }
//        })
//    })
//});


