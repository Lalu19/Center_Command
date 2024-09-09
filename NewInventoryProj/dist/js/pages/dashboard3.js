
$(function () {
    var monthname = [];
    var PlanPoints = [];
    var RealData = [];
    var monthname1 = [];
    var PlanPoints1 = [];
    var RealData1 = [];
    var Matmonthname = [];
    var MatPlanPoints = [];
    var MatRealData = [];
    var Servmonthname = [];
    var ServPlanPoints = [];
    var ServRealData = [];
    var ServMaterialData = [];
    var prevmonth = [];
    var PrevActualCost = [];
    var PrevActualMaterialCost = [];
    var PrevActualServicCost = [];

    'use strict'
   
   ////get current year month wise data
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetMonthlyBudgetdata',
        dataType: 'json',
        success: function (response) {

            $.each(response, function (i, val) {
                //var hjjh = val.BudgetAmount;
                monthname.push(val.monthname);
                PlanPoints.push(val.MonthlyBudgetPlan);
                if (val.monthlyRealdata == null || val.monthlyRealdata == "") {
                    RealData.push(0);
                } else {
                   
                    var x = +val.monthlyRealdata + +val.ActualService;
                   
                    
                   RealData.push(x);
                    //RealData = RealData.map(function (value) {
                    //    return (value / 10000000).toFixed(2);
                }
            });           
            generateChart(monthname, PlanPoints,RealData);
        }
    })

    ////Trial
    //$.ajax({
    //    type: "POST",
    //    url: '/api/Inventory/GetFuranceInductorReading',
    //    dataType: 'json',
    //    success: function (response) {
    //        console.log('Response Data:', response);

    //        var date = [];
    //        var Power = [];
    //        var LineAMPS = [];

    //        $.each(response, function (i, val) {
    //            date.push(val.Date);
    //            Power.push(parseFloat(val.Power) || 0);
    //            LineAMPS.push(parseFloat(val.LineAMPS) || 0);
    //        });

    //        // Processed data arrays for chart
    //        console.log('Processed Data:');
    //        console.log('Date:', date);
    //        console.log('Power:', Power);
    //        console.log('LineAMPS:', LineAMPS);

    //        generateChart8(date, Power, LineAMPS);
    //    },
    //    error: function (xhr, status, error) {
    //        console.log('AJAX Error:', error);
    //    }
    //});

    $.ajax({
        url: '/api/Inventory/GetFuranceInductorReadingforIndex',
        type: 'POST',
        success: function (response) {
            // Process the data received from the API
            console.log(response);

            // Assuming response is an array of objects with Date, Power, LineAMPS, LinePF, and LoadAMPS properties
            var date = response.map(item => item.Date);
            var Power = response.map(item => item.Power);
            var LineAMPS = response.map(item => item.LineAMPS);
            var LinePF = response.map(item => item.LinePF);
            var LoadAMPS = response.map(item => item.LoadAMPS);

            // Call the function to generate the chart with the retrieved data
            generateChart8(date, Power, LineAMPS, LinePF, LoadAMPS);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });

    ////Get Total Month Service Cost Expenditure Data
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetServiceCostexpenditure',
        dataType: 'json',
        success: function (response) {
           // console.log('Response Data:', response);

            var monthname = [];
            var PlanPoints = [];
            var RealData = [];

            $.each(response, function (i, val) {
                monthname.push(val.monthname);
                PlanPoints.push(parseFloat(val.MonthlyBudgetPlan) || 0);
                RealData.push(parseFloat(val.monthlyRealdata) || 0);
            });

            //// Processed data arrays for chart
            //console.log('Processed Data:');
            //console.log('Month Names:', monthname);
            //console.log('Plan Points:', PlanPoints);
            //console.log('Real Data:', RealData);

            generateChart9(monthname, PlanPoints, RealData);
        },
        error: function (xhr, status, error) {
            console.log('AJAX Error:', error);
        }
    });

     ////Get Total Inventory Cost Expenditure Data
    $.ajax({
        type: "POST",
        url: '/api/Inventory/GetMonthlyInventoryCostBudgetdata',
        dataType: 'json',
        success: function (response) {
            //console.log('Response Data:', response);

            var monthname = [];
            var PlanPoints = [];
            var RealData = [];

            $.each(response, function (i, val) {
                monthname.push(val.monthname);
                PlanPoints.push(parseFloat(val.MonthlyBudgetPlan) || 0);
                RealData.push(parseFloat(val.monthlyRealdata) || 0);
            });

            //// Processed data arrays for chart
            //console.log('Processed Data:');
            //console.log('Month Names:', monthname);
            //console.log('Plan Points:', PlanPoints);
            //console.log('Real Data:', RealData);

            generateChart10(monthname, PlanPoints, RealData);
        },
        error: function (xhr, status, error) {
            console.log('AJAX Error:', error);
        }
    });

  var ticksStyle = {
    fontColor: '#495057',
    fontStyle: 'bold'
  }
   
  var mode      = 'index'
  var intersect = true
   
    function generateChart(monthname, PlanPoints, RealData) {
        var $salesChart = $('#sales-chart'); 
        var salesChart = new Chart($salesChart, {
            type: 'bar',
            data: {
                labels: monthname,
                datasets: [{
                    label: 'Target Cost',
                    data: PlanPoints.map(value => (value / 10000000).toFixed(2)),
                    backgroundColor: '#007bff',
                    order: 2 // Set order to 2 to ensure bars are behind the line graph
                }, {
                    label: 'Actual Cost',
                    data: RealData.map(value => (value / 10000000).toFixed(2)),
                    backgroundColor: '#6b430c',
                    type: 'line',
                    borderColor: '#6b430c',
                    fill: false,
                    borderWidth: 3
                   // backgroundColor: '#a8a720', //Green
                }]
            },
            dataPointWidth: 5,
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    mode: mode,
                    intersect: intersect
                },
                hover: {
                    mode: mode,
                    intersect: intersect
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: true,
                            lineWidth: '4px',
                            color: 'rgba(0, 0, 0, .2)',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            beginAtZero: true,
                            callback: function (value, index, values) {
                                if (value >= 10000000) {
                                    value = (value / 10000000).toFixed(2);
                                    return 'Rs. ' + value + ' Cr';
                                } else {
                                    return 'Rs. ' + value + ' Cr';
                                }
                            }
                        }
                    }],
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        },
                        ticks: ticksStyle
                    }]
                }
            }
        });
    }

    function generateChart8(date, Power, LineAMPS, LinePF, LoadAMPS) {
        var $salesChart = $('#sales-chart8');
        var salesChart = new Chart($salesChart, {
            type: 'line',
            data: {
                labels: date,
                datasets: [
                    {
                        label: 'Power',
                        backgroundColor: '#3a556e',
                        borderColor: '#3a556e',
                        data: Power,
                        fill: false
                    },
                    {
                        label: 'LineAMPS',
                        backgroundColor: '#c19970',
                        borderColor: '#c19970',
                        data: LineAMPS,
                        fill: false
                    },
                    {
                        label: 'LinePF',
                        backgroundColor: '#ffcc00',
                        borderColor: '#ffcc00',
                        data: LinePF,
                        fill: false
                    },
                    {
                        label: 'LoadAMPS',
                        backgroundColor: '#66ccff',
                        borderColor: '#66ccff',
                        data: LoadAMPS,
                        fill: false
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                hover: {
                    mode: 'index',
                    intersect: true
                },
                legend: {
                    display: true
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: true,
                            lineWidth: '4px',
                            color: 'rgba(0, 0, 0, .2)',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        }
                    }]
                },
                plugins: {
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true
                            },
                            mode: 'xy'
                        },
                        zoomButtons: {
                            zoomInText: 'Zoom In',
                            zoomOutText: 'Zoom Out',
                            zoomInFunction: function ({ chart }) {
                                chart.resetZoom();
                                chart.zoom(1.5);
                            },
                            zoomOutFunction: function ({ chart }) {
                                chart.resetZoom();
                            }
                        }
                    }
                }
            }
        });
    }
    ////Zoomin Zoomout
    //function generateChart8(date, Power, LineAMPS) {
    //    var $salesChart = $('#sales-chart8'); // canvas id
    //    var salesChart = new Chart($salesChart, {
    //        type: 'line', // Change chart type to line
    //        data: {
    //            labels: date,
    //            datasets: [
    //                {
    //                    label: 'Power',
    //                    backgroundColor: '#3a556e',
    //                    borderColor: '#3a556e',
    //                    data: Power,
    //                    fill: false // Ensure the line is not filled
    //                },
    //                {
    //                    label: 'LineAMPS',
    //                    backgroundColor: '#c19970',
    //                    borderColor: '#c19970',
    //                    data: LineAMPS,
    //                    fill: false
    //                }
    //            ]
    //        },
    //        options: {
    //            maintainAspectRatio: false,
    //            tooltips: {
    //                mode: 'index',
    //                intersect: true
    //            },
    //            hover: {
    //                mode: 'index',
    //                intersect: true
    //            },
    //            legend: {
    //                display: true
    //            },
    //            scales: {
    //                yAxes: [{
    //                    gridLines: {
    //                        display: true,
    //                        lineWidth: '4px',
    //                        color: 'rgba(0, 0, 0, .2)',
    //                        zeroLineColor: 'transparent'
    //                    },
    //                    ticks: {
    //                        beginAtZero: true
    //                    }
    //                }],
    //                xAxes: [{
    //                    display: true,
    //                    gridLines: {
    //                        display: false
    //                    }
    //                }]
    //            },
    //            plugins: {
    //                zoom: {
    //                    zoom: {
    //                        wheel: {
    //                            enabled: true,
    //                        },
    //                        pinch: {
    //                            enabled: true
    //                        },
    //                        mode: 'xy'
    //                    },
    //                    zoomButtons: {
    //                        zoomInText: 'Zoom In',
    //                        zoomOutText: 'Zoom Out',
    //                        zoomInFunction: function ({ chart }) {
    //                            chart.resetZoom();
    //                            chart.zoom(1.5);
    //                        },
    //                        zoomOutFunction: function ({ chart }) {
    //                            chart.resetZoom();
    //                        }
    //                    }
    //                }
    //            }
    //        }
    //    });
    //}

    function generateChart9(monthname, PlanPoints, RealData) {
        var $salesChart = $('#sales-chart9'); 
        var salesChart = new Chart($salesChart, {
            type: 'bar',
            data: {
                labels: monthname,
                datasets: [
                    {
                        backgroundColor: '#3a556e',
                        borderColor: '#3a556e',
                        data: PlanPoints.map(value => (value / 10000000).toFixed(2)),
                    },
                    {
                        backgroundColor: '#76ae5d',
                        borderColor: '#76ae5d',
                        data: RealData.map(value => (value / 10000000).toFixed(2))
                    }
                ]
            },
            //  //////For Line Graph
            //  data: {
            //    labels: monthname,
            //    datasets: [{
            //        data: PlanPoints.map(value => (value / 10000000).toFixed(2)),
            //        backgroundColor: '#3a556e',
            //        order: 2 // Set order to 2 to ensure bars are behind the line graph
            //    }, {
            //        data: RealData.map(value => (value / 10000000).toFixed(2)),
            //            backgroundColor: '#76ae5d',
            //        type: 'line',
            //            borderColor: '#76ae5d',
            //        fill: false,
            //        borderWidth: 2
            //        // backgroundColor: '#a8a720', //Green
            //    }]
            //},
            dataPointWidth: 5,
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    mode: mode,
                    intersect: intersect
                },
                hover: {
                    mode: mode,
                    intersect: intersect
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: true,
                            lineWidth: '4px',
                            color: 'rgba(0, 0, 0, .2)',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            beginAtZero: true,
                            callback: function (value, index, values) {
                                if (value >= 10000000) {
                                    value = (value / 10000000).toFixed(2);
                                    return 'Rs. ' + value + ' Cr';
                                } else {
                                    return 'Rs. ' + value + ' Cr';
                                }
                            }
                        }
                    }],
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        },
                        ticks: ticksStyle
                    }]
                }
            }
        });
    }

    function generateChart10(monthname, PlanPoints, RealData) {
        var $salesChart = $('#sales-chart10');
        var salesChart = new Chart($salesChart, {
            type: 'bar',
            //data: {
            //    labels: monthname,
            //    datasets: [
            //        {
            //            backgroundColor: '#3a556e',
            //            borderColor: '#3a556e',
            //            data: PlanPoints.map(value => (value / 10000000).toFixed(2)),
            //        },
            //        {
            //            backgroundColor: '#b8bcbf',
            //            borderColor: '#b8bcbf',
            //            data: RealData.map(value => (value / 10000000).toFixed(2))
            //        }
            //    ]
            //},
            data: {
                labels: monthname,
                datasets: [{
                    label: 'Fixed Cost',
                    data: PlanPoints.map(value => (value / 10000000).toFixed(2)),
                    backgroundColor: '#e84a73',
                    borderColor: '#e84a73',
                    type: 'line',
                    fill: false,
                    borderWidth: 2,
                    order: 2 // Set order to 2 to ensure bars are behind the line graph
                }, {
                    label: 'Actual Cost',
                    data: RealData.map(value => (value / 10000000).toFixed(2)),
                    backgroundColor: '#799fc2',
                    type: 'line',
                    borderColor: '#799fc2',
                    fill: false,
                    borderWidth: 2
                }]
            },
            dataPointWidth: 5,
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    mode: mode,
                    intersect: intersect
                },
                hover: {
                    mode: mode,
                    intersect: intersect
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: true,
                            lineWidth: '4px',
                            color: 'rgba(0, 0, 0, .2)',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            beginAtZero: true,
                            callback: function (value, index, values) {
                                if (value >= 10000000) {
                                    value = (value / 10000000).toFixed(2);
                                    return 'Rs. ' + value + ' Cr';
                                } else {
                                    return 'Rs. ' + value + ' Cr';
                                }
                            }
                        }
                    }],
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        },
                        ticks: ticksStyle
                    }]
                }
            }
        });
    }

})
