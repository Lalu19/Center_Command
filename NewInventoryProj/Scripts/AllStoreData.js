$(document)
    .ready( function  () {
			
    $.ajax({                                             //
        url: '/api/Inventory/BindAllStoreData',
        type: 'POST',
        datatype: 'json',
        //data: { ofst: flag, fetch: 1, user: user },
        success: function (data) {
          
			$('#storeData').find('tbody').empty();
			$.each(JSON.parse(data),function (i,val) {
						
						
						/*var date = new Date(
							val.entryDate);
						var dateString = date
							.getDate()
							+ "-";

						if (date
							.getMonth() == 12) {
							dateString = dateString
								+ "-1-";
						} else {
							var m = date
								.getMonth() + 1;
							dateString = dateString
								+ m
								+ "-";
						}

						dateString = dateString
							+ date
								.getFullYear();*/

						//var text1 = "<tr style='background-color: #ffffff !important;'><td>" + val.Sno + "</td><td>" + val.UMC_No + "</td><td>" + val.Item_Desc + "</td><td>" + val.Part_No + "</td><td>" + val.Part_No+"</td></tr>"
                        //var date = new date(val.Entry_Date);
                        //var datestring = date.getDate();
                        //alert(datestring);
                        //d = d.split(' ')[0];
                        //console.log(d);
                        var text = "<tr><td>"
                            + val.Sno
                            + "</td><td>"
                            + val.UMC_No
                            + "</td><td>"
                            + val.Item_Desc
                            + "</td><td>"
                            + val.Part_No
                            + "</td> <td>"
                            + val.Category
                            + "</td><td>"
                            + val.Qty
                            + "</td>"
                            + "<td> "
                            + val.Entry_Date
                            + "</td></tr>";
						//alert(text);						
						$('#storeData').find('tbody').append(text);
                        $('#storeData').dataTable();
					});
           
          
        }
    });

          
	});

function SearchStoreData() {
    debugger
    var fromdate = document.getElementById("FromDate").value;
    var todate = document.getElementById("ToDate").value;
    $.ajax({
        url: '/api/Inventory/GetSearchStoreData',
        type: 'json',
        method: 'post',
        data: { FromDate: fromdate, ToDate: todate },
        onbeforeUnload: function () {
            document.getElementById("plzwt").value = " Please Wait..";
        },
        success: function (response) {
            $('#storeData').find('tbody').empty();
            //$("#LogForm")[0].reset();
            debugger
            $
                .each(
                    JSON.parse(response),

                    function (i,
                        val) {
                        debugger
                        //('#storeData').empty();




                        

                          var  text = "<tr><td>"
                            + val.Sno
                            + "</td><td>"
                            + val.UMC_No
                            + "</td><td>"
                            + val.Item_Desc
                            + "</td><td>"
                            + val.Part_No
                            + "</td> <td>"
                            + val.Category
                            + "</td><td>"
                            + val.Qty
                            + "</td>"
                            + "<td> "
                            + val.Entry_Date
                            + "</td></tr>";

                        $('#storeData').find('tbody').append(text);
                        $('#storeData').dataTable();
                    });
        }
    })
};