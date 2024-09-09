
// Load google charts
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
// Draw the chart and set the chart values
function drawChart() {
   
    $.ajax({
        url: '/api/Inventory/GetDataForPieChart',
        type: 'POST',
        datatype: 'json',
        //data: { UMC_No: umc },
        success: function (data) {
        

            
            $
                .each(
                    JSON.parse(data),
                    function (i,
                        val) {
                        var data = google.visualization.arrayToDataTable([
                            ['Category', 'Amount'],
                            ['Automation', val.Automation],
                            ['Consumable', val.Consumable],
                            ['Drive', val.Drive],
                            ['electronic Component', val.ElectronicsComponent],
                            ['Instrumentation', val.Instrumentation],
                            ['Software', val.Software],
                            ['Tools', val.Tools]
                        ]);

                        // Optional; add a title and set the width and height of the chart
                        var options = { 'title': 'Inventory Store Qty', 'width': 450, 'height': 400, };

                        // Display the chart inside the <div> element with id="piechart"
                        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
                        chart.draw(data, options);
                    });
        }

    });
}
    
//  var data = google.visualization.arrayToDataTable([
//      ['Category', 'Amount'],
//      ['Automation', 4],
//      ['Consumable', 4],
//      ['Drive', 2],
//      ['electronic Component', 4],
//      ['Instrumental', 2],
//      ['Softwares', 4],
//      ['Tools', 4]
//]);

//  // Optional; add a title and set the width and height of the chart
//  var options = {'title':'Inventory Average Data', 'width':550, 'height':400};

//  // Display the chart inside the <div> element with id="piechart"
//  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
//  chart.draw(data, options);
//}
