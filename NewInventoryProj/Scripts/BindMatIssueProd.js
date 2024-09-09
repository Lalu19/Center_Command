$(document)
	.ready(function () {
		var umc = null;
		$.ajax({                                            
			url: '/api/Inventory/GetMaterialIssueData',
			type: 'POST',
			datatype: 'json',
			data: { UMC_No:umc },
			success: function (data) {

				$('#MatIssue').find('tbody').empty();
				$
					.each(
						JSON.parse(data),
						function (i,
							val) {
							
							var date2 = new Date(val.Issue_Date);
							var IssueDate = date2.getDate() + "-";

							if (date2.getMonth() == 12) {
								IssueDate = IssueDate + "-1-";
							} else {
								var m = date2.getMonth() + 1;
								IssueDate = IssueDate + m + "-";
							}

							IssueDate = IssueDate + date2.getFullYear();
							var slno = i + 1;
							var text = "<tr style='background-color: #ffffff !important;'>";
							
							text = text
								+ "<td>"
								+slno
								+"</td><td class = ''>"
								+ val.UMC_No
								+ "</td><td class = ''>"
								+ val.Item_Desc
								+ "</td><td style= 'text-align: left;'>  <a href='#' class = 'itemDesc'>"
								+ val.Location
								+ "</td><td style= 'text-align: left;'>  <a href='#' class = 'Location'>"
								+ val.Sub_Location
								+ "</td><td style= 'text-align: left;'>  <a href='#' class = 'Sub_Location'>"
								+ val.Plant_Location
								+ "</a></td> <td class = 'Plant_Location' style= ''>"
								+ val.Issue_Qty
								+ "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'Issue_Qty'>"
								+ val.ReceiverId
								+ "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'ReceiverId'>"
								+ val.IssueirId
								+ "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'Entry_Date'>"
								+ val.Remarks
								+ "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'Entry_Date'>"
								+ IssueDate
								+ "</a></td></tr>";
							
							//alert(text);						
							$('#MatIssue').find('tbody').append(text);

						});
				$('#MatIssue').dataTable(
					{
						// parameters
						// "scrollY": 400,
						"lengthMenu": [[10, 15, 20, -1],
						[10, 15, 20, "All"]],
						autoWidth: false,
						responsive: true,


						"drawCallback": function (settings) {

							//$('[data-toggle="tooltip"]').tooltip({
							//	container: 'body'
							//})


							// add as many tooltips you want

						},
					});

			}
		});


	});



function SearchIssueData() {
	debugger
	var umc = document.getElementById("UMC_No").value;
	$.ajax({                                             //
		url: '/api/Inventory/GetMaterialIssueData',
		type: 'POST',
		datatype: 'json',
		data: {UMC_No:umc},
		//data: { ofst: flag, fetch: 1, user: user },
		success: function (data) {

			$('#MatIssue').find('tbody').empty();
			$
				.each(
					JSON.parse(data),
					function (i,
						val) {
						debugger
						var text = "<tr style='background-color: #ffffff !important;'>";

						text = text
							+ "<td class = ''>"
							+ val.UMC_No
							+ "</td><td class = ''>"
							+ val.Item_Desc
							+ "</td><td style= 'text-align: left;'>  <a href='#' class = 'itemDesc'>"
							+ val.Part_No
							+ "</a></td> <td class = 'Part_No' style= ''>"
							+ val.Issue_Qty
							+ "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'make'>"
							+ val.ReceiverId
							+ "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'Entry_Date'>"
							+ val.IssueirId
							+ "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'Entry_Date'>"
							+ val.Issue_Date
							+ "</a></td></tr>";

						//alert(text);						
						$('#MatIssue').find('tbody').append(text);

					});
			$('#MatIssue').dataTable(
				{
					// parameters
					// "scrollY": 400,
					"lengthMenu": [[10, 15, 20, -1],
					[10, 15, 20, "All"]],
					autoWidth: false,
					responsive: true,


					"drawCallback": function (settings) {

						$('[data-toggle="tooltip"]').tooltip({
							container: 'body'
						})


						// add as many tooltips you want

					},
				});


		}
	});
}
function ClearSearchIssueData() {

	$('#UMC_No').empty();
	window.location.href = "/Home/AllMaterialIssue";
}