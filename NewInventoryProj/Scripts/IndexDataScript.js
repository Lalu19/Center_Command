  //FUNCTION for fetch of about to end data
  //$(document).ready(function () {

  //          $.ajax({
  //              type: "POST",
  //              //url: "/api/Inventory/GetMinimumStoreQty",
  //              url: "/api/Inventory/GetcostlyItems",
  //              dataType: "json",
  //              data: '',
  //              contentType: "application/json",
  //              success: function (response) {
                 
  //                  var data = JSON.parse(response);

  //                  for (var i = 0; i < data.length; i++) {

  //                      var text = text + "<tr>"
  //                          + "<td ><span class='label label-warning'><strong style='color:black'>" + data[i].umc_no + "</strong></span></td>" +
  //                          "<td>" + data[i].item_desc +" & "+ data[i].qty + "</td>" +
  //                          //"<td>" + data[i].Part_No + "</td>" +
  //                          //"<td ><a data-toggle='tooltip' title='" + data[i].Unit + "' ><span class='badge badge-danger'>" + data[i].Qty + "</span></a></td>" +
  //                          //"<td>" + data[i].Location + "</td>" +
  //                          "</tr > "
  //                  }
  //                  $('#costlyprodindex').append(text);
  //              }
  //          });
  //});
//get monthly budget amount
$(document).ready(function () {
    var monthlytrgt = 0;
    var mnthlyamtpurchsed = 0;
    var restamt = 0;
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetMonthlyBudgetAmount',
        dataType: 'json',
        success: function (response) {
           // var data = json.parse(response);
            $('#BudgetAmt').empty();

            $.each(JSON.parse(response), function (i, val) {
                //var totalamt = val.BudgetAmount.toFixed(2);
                //$('#BudgetAmt').html(totalamt);

                var totalamt = (val.BudgetAmount / 10000000).toFixed(2);
                $('#BudgetAmt').html(totalamt + ' Cr');

               // $('#BudgetAmt').html(val.BudgetAmount);
                //document.getElementById("hididbudgetamt").value = val.BudgetAmount;
                monthlytrgt = val.BudgetAmount;
                $('#restamount').html(monthlytrgt - mnthlyamtpurchsed);
                //var rstamt = val.BudgetAmount; - document.getElementById('hididreceiveamt');
                //$('#restamount').html(rstamt);
            });
        }
    })

    //monthly receive amount
    $.ajax({
        type: "POST",
        url: '/api/Inventory/Getmonthlyreceivamount',
        dataType: 'json',
        success: function (response) {
            // var data = json.parse(response);
            $('#receiveAmt').empty();
            $.each(response, function (i, val) {
                //var hjjh = val.BudgetAmount;

                var materialamt = val.MaterialAmt;
                var serviceamt = val.ServiceAmt;
                mnthlyamtpurchsed = materialamt + serviceamt;
              
                $('#receiveAmt').html(mnthlyamtpurchsed);
                $('#restamount').html(monthlytrgt - mnthlyamtpurchsed);
            });
        }
    })
    //total purchase amount
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetTotalPurchaseAmount',
        dataType: 'json',
        success: function (response) {
            // var data = json.parse(response);
            $('#TotalPurchase').empty();
            $.each(JSON.parse(response), function (i, val) {
                //var hjjh = val.BudgetAmount;
                var totalamt = val.totalpurchase.toFixed(2);
                $('#TotalPurchase').html(totalamt);
               
            });
        }
    })
    //$.ajax({
    //    type: "POST",
    //    url: '/api/Inventory/GetTotalBudget',
    //    dataType: 'json',
    //    success: function (response) {
    //        // var data = json.parse(response);
    //        $('#totalbudgettt').empty();
    //        $.each(JSON.parse(response), function (i, val) {
    //            //var hjjh = val.BudgetAmount;
    //            var totalamt = val.totalcost.toFixed(2);
    //            $('#totalbudgettt').html(totalamt);

    //        });
    //    }
    //})
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetTotalBudget',
        dataType: 'json',
        success: function (response) {
            $('#totalbudgettt').empty();
            $.each(JSON.parse(response), function (i, val) {
                var totalamt = (val.totalcost / 10000000).toFixed(2); 
                $('#totalbudgettt').html(totalamt + ' Cr');
            });
        }
    });

    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetTotalMaterialCost',
        dataType: 'json',
        success: function (response) {
            // var data = json.parse(response);
            $('#totalmateriall').empty();
            $.each(JSON.parse(response), function (i, val) {
                //var totalamt = val.totalcost.toFixed(2);
                //$('#totalmateriall').html(totalamt);

                var totalamt = (val.totalcost / 10000000).toFixed(2);
                $('#totalmateriall').html(totalamt + ' Cr');
            });
        }
    })
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetTotalServiceCost',
        dataType: 'json',
        success: function (response) {
            // var data = json.parse(response);
            $('#totalservicee').empty();
            $.each(JSON.parse(response), function (i, val) {
                //var totalamt = val.totalcost.toFixed(2);
                //$('#totalservicee').html(totalamt);

                var totalamt = (val.totalcost / 10000000).toFixed(2);
                $('#totalservicee').html(totalamt + ' Cr');

            });
        }
    })
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetTotalStockk',
        dataType: 'json',
        success: function (response) {
            // var data = json.parse(response);
            $('#totalstockk').empty();
            $.each(JSON.parse(response), function (i, val) {
                var totalamt = val.totalqty.toFixed(0);
                $('#totalstockk').html(totalamt);
            });
        }
    })
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetTotalPriceinInventory',
        dataType: 'json',
        success: function (response) {
            // var data = json.parse(response);
            $('#totalpricee').empty();
            $.each(JSON.parse(response), function (i, val) {
                //var totalamt = val.totalpricee.toFixed(2);
                //$('#totalpricee').html(totalamt);

                var totalamt = (val.totalpricee / 10000000).toFixed(2);
                $('#totalpricee').html(totalamt + ' Cr');
            });
        }
    })
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetTotalYtdBudget',
        dataType: 'json',
        success: function (response) {
            // var data = json.parse(response);
            $('#ytdtotalbudgettt').empty();
            $.each(JSON.parse(response), function (i, val) {
                //var totalamt = val.totalcostt.toFixed(2);
                //$('#ytdtotalbudgettt').html(totalamt);

                var totalamt = (val.totalcostt / 10000000).toFixed(2);
                $('#ytdtotalbudgettt').html(totalamt + ' Cr');
            });
        }
    })
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetTotalYtdMaterialCost',
        dataType: 'json',
        success: function (response) {
            // var data = json.parse(response);
            $('#ytdtotalmateriall').empty();
            $.each(JSON.parse(response), function (i, val) {
                //var totalamt = val.matcost.toFixed(2);
                //$('#ytdtotalmateriall').html(totalamt);

                var totalamt = (val.matcost / 10000000).toFixed(2);
                $('#ytdtotalmateriall').html(totalamt + ' Cr');
            });
        }
    })
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetTotalYtdServiceCos',
        dataType: 'json',
        success: function (response) {
            // var data = json.parse(response);
            $('#ytdtotalservicee').empty();
            $.each(JSON.parse(response), function (i, val) {
                //var totalamt = val.sercost.toFixed(2);
                //$('#ytdtotalservicee').html(totalamt);

                var totalamt = (val.sercost / 10000000).toFixed(2);
                $('#ytdtotalservicee').html(totalamt + ' Cr');
            });
        }
    })
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetMonthlyTotalYtdBudget',
        dataType: 'json',
        success: function (response) {
            // var data = json.parse(response);
            $('#ytdtotaltargetert').empty();
            $.each(JSON.parse(response), function (i, val) {
                //var totalamt = val.totalcostt.toFixed(2);
                //$('#ytdtotaltargetert').html(totalamt);

                var totalamt = (val.totalcostt / 10000000).toFixed(2);
                $('#ytdtotaltargetert').html(totalamt + ' Cr');
            });
        }
    })
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetCurrentmonthMC',
        dataType: 'json',
        success: function (response) {
            // var data = json.parse(response);
            $('#CmMc').empty();
            $.each(JSON.parse(response), function (i, val) {
                //var totalamt = val.MaterialCost.toFixed(2);
                //$('#CmMc').html(totalamt);

                var totalamt = (val.MaterialCost / 10000000).toFixed(2);
                $('#CmMc').html(totalamt + ' Cr');
            });
        }
    })
 
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetYtdCurrentmonthMC',
        dataType: 'json',
        success: function (response) {
            // var data = json.parse(response);
            $('#ytdCmMc').empty();
            $.each(JSON.parse(response), function (i, val) {
                //var totalamt = val.ytdMC.toFixed(2);
                //$('#ytdCmMc').html(totalamt);

                var totalamt = (val.ytdMC / 10000000).toFixed(2);
                $('#ytdCmMc').html(totalamt + ' Cr');
            });
        }
    })
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetCurrentmonthSC',
        dataType: 'json',
        success: function (response) {
            // var data = json.parse(response);
            $('#CmSc').empty();
            $.each(JSON.parse(response), function (i, val) {
                //var totalamt = val.ServiceCost.toFixed(2);
                //$('#CmSc').html(totalamt);

                var totalamt = (val.ServiceCost / 10000000).toFixed(2);
                $('#CmSc').html(totalamt + ' Cr');
            });
        }
    })

    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetYtdCurrentmonthSC',
        dataType: 'json',
        success: function (response) {
            // var data = json.parse(response);
            $('#ytdCmSc').empty();
            $.each(JSON.parse(response), function (i, val) {
                //var totalamt = val.ytdSC.toFixed(2);
                //$('#ytdCmSc').html(totalamt);

                var totalamt = (val.ytdSC / 10000000).toFixed(2);
                $('#ytdCmSc').html(totalamt + ' Cr');
            });
        }
    })
   
});

//get monthly receive amount
//$(document).ready(function () {
  
//    $.ajax({
//        type: "POST",
//        url: '/api/Inventory/Getmonthlyreceivamount',
//        dataType: 'json',
//        success: function (response) {
//            debugger
//            // var data = json.parse(response);
//            $('#receiveAmt').empty();
//            $.each(JSON.parse(response), function (i, val) {
//                //var hjjh = val.BudgetAmount;
//                $('#receiveAmt').html(val.matreceiveamt);
//                document.getElementById('hididreceiveamt').value = val.matreceiveamt;
//                var rstamt = document.getElementById('hididbudgetamt') - val.matreceiveamt;
//                $('#restamount').html(rstamt);
//            });
//        }
//    })
//});

//scroll data table in index page
//$(document).ready(function () {
//    pageScroll();
//    $("#contain")
//        .mouseover(function () {
//            clearTimeout(my_time);
//        })
//        .mouseout(function () {
//            pageScroll();
//        });

//    getWidthHeader("table_fixed", "table_scroll");
//});

//var my_time;
//function pageScroll() {
//    var objDiv = document.getElementById("contain");
//    objDiv.scrollTop = objDiv.scrollTop + 1;
//    if (objDiv.scrollTop + 300 == objDiv.scrollHeight) {
//        objDiv.scrollTop = 0;
//    }
//    my_time = setTimeout("pageScroll()", 25);
//}

//function getWidthHeader(id_header, id_scroll) {
//    var colCount = 0;
//    $("#" + id_scroll + " tr:nth-child(1) td").each(function () {
//        if ($(this).attr("colspan")) {
//            colCount += +$(this).attr("colspan");
//        } else {
//            colCount++;
//        }
//    });

//    for (var i = 1; i <= colCount; i++) {
//        var th_width = $(
//            "#" + id_scroll + " > tbody > tr:first-child > td:nth-child(" + i + ")"
//        ).width();
//        $("#" + id_header + " > thead th:nth-child(" + i + ")").css(
//            "width",
//            th_width + "px"
//        );
//    }
//}

