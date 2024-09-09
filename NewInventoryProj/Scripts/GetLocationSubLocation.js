
$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "/api/Inventory/BindAllLocation",
        dataType: "json",
        data: '',
        contentType: "application/json",
        success: function (response) {
            var data = JSON.parse(response);

            for (var i = 0; i < data.length; i++) {
                $("#Location").append("<option value='" + data[i].Location_Name + "'> " + data[i].Location_Name + "</option>");
            }
        }
    });

    //I Add onchange event separately
    $("#Location").on("change", function () {
        var selectedLocation = $(this).val();
        GetSubLocation(selectedLocation); 
    });
});

function GetSubLocation(LocationId) {
    var name = LocationId; //I Use the location name directly without splitting

    $.ajax({
        type: "POST",
        url: '/api/Inventory/BindAllSubLocationByLocation',
        dataType: 'json',
        data: { LocationName: name },
        beforeSend: function () {
        },
        success: function (data) {
            $("#SubLocation").empty();
            var parsedData = JSON.parse(data);
            for (var i = 0; i < parsedData.length; i++) {
                $("#SubLocation").append("<option value='" + parsedData[i].Sub_Location_Name + "'> " + parsedData[i].Sub_Location_Name + "</option>");
            }
        },
        error: function (error) {
            console.error("Error fetching sublocations:", error);
        }
    });
}

///////Old Code
//$(document).ready(function () {

//    $.ajax({
//        type: "POST",
//        url: "/api/Inventory/BindAllLocation",
//        dataType: "json",
//        data: '',
//        contentType: "application/json",
//        success: function (response) {
            
//            var data = JSON.parse(response);

//            for (var i = 0; i < data.length; i++) {
//                $("#Location").append("<option  value='" + data[i].Location_ID + "+" + data[i].Location_Name+"' onchange='GetSubLocation(this.value)'> " + data[i].Location_Name + "</option>");

//            }
//        }
//    });
//});
//function GetSubLocation(LocationId) {
    
//    var loc = LocationId.split("+");
//    var locationid = loc[0];
//    var name = loc[1];
//    $.ajax({
//        type: "POST",
//        url: '/api/Inventory/BindAllSubLocationByLocation',
//        dataType: 'json',
//        data: { LocationName: name },

//        beforeSend: function () {
//            // $("#room").html("<span class='fa fa-spin'><span class='fa fa-spinner'></span></span>");
//        },

//        success: function (data) {
//            $("#SubLocation").empty();
            
//            var data = JSON.parse(data);
//            for (var i = 0; i < data.length; i++) {
//                $("#SubLocation").append("<option value='" + data[i].Sub_Location_Name + "'> " + data[i].Sub_Location_Name + "</option>");

//            }
//        }
//    })
//}