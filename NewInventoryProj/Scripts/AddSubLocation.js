

    $("#SubLocationbtn").click(function () {
        debugger
        var LocationName = document.getElementById("Location").value;
       
        var SubLocationName = document.getElementById("SubLocationName").value;

      
        debugger
        var datastring = { LocationNameSss: LocationName, SubLocationName: SubLocationName};

        $.ajax({
            url: '/api/Inventory/AddSubLocation',
            method: 'POST',

            data: datastring,
            dataType: 'json',
            onbeforeUnload: function () {
                document.getElementById("plzwt").value = " Please Wait..";
            },
         
            success: function (response) {
                debugger
                //$("#LogForm")[0].reset();
                //var data = JSON.parse(response);
                if (response == true) {
                    location.reload();
                    alert("SubLocation Add Successful");
                    document.getElementById("Location")=clear;
                    document.getElementById("SubLocationName") = clear;
                } else {
                    alert("Duplicate SubLocation Name!!!");
                }

              

            }
        })
        //}
    })

