$(document)
	.ready(function () {
		var umc = null;
		$.ajax({                                             //
			url: '/api/Inventory/GetAllToolIssueData',
			type: 'POST',
			datatype: 'json',
			//data: { UMC_No: umc },
			success: function (data) {

				$('#MatIssue').find('tbody').empty();
				$.each(JSON.parse(data),function (i,val) {
					
					var date2 = new Date(val.IssueDate);
					var IssueDate = date2.getDate() + "-";

					if (date2.getMonth() == 12) {
						IssueDate = IssueDate + "-1-";
					} else {
						var m = date2.getMonth() + 1;
						IssueDate = IssueDate + m + "-";
					}

					IssueDate = IssueDate + date2.getFullYear();
							var text = "<tr style='background-color: #ffffff !important;'>";

							text = text
								+ "<td class = ''>"
								+ val.UMC_No
								+ "</td><td class = ''>"
								+ val.ToolName
								+ "</td><td style= 'text-align: left;'>  <a href='#' class = 'itemDesc'>"
								+ val.PartNo
								+ "</a></td> <td class = 'Part_No' style= ''>"
								+ val.IssueQty
								+ "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'make'>"
								+ val.ReceiverId
								+ "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'Entry_Date'>"
								+ val.IssuierId
								+ "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'Entry_Date'>"
								+ IssueDate
								+ "</a></td></tr>";

							//alert(text);						
							$('#ToolIssue').find('tbody').append(text);

						});
				$('#ToolIssue').dataTable(
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


	});

