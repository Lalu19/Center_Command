$(document)
	.ready(function () {
	
		$.ajax({                                             //
			url: '/api/Inventory/getToolsDepositData',
			type: 'POST',
			datatype: 'json',
			//data: { UMC_No: umc },
			success: function (data) {
				debugger
				$('#ToolDeposit').find('tbody').empty();
				$
					.each(
						JSON.parse(data),
						function (i,
							val) {
							var date2 = new Date(val.DepositDate);
							var DepositDate = date2.getDate() + "-";

							if (date2.getMonth() == 12) {
								IssueDate = DepositDate + "-1-";
							} else {
								var m = date2.getMonth() + 1;
								DepositDate = DepositDate + m + "-";
							}

							DepositDate = DepositDate + date2.getFullYear();
							var text = "<tr style='background-color: #ffffff !important;'>";

							text = text
								+ "<td class = ''>"
								+ val.UMC_No
								+ "</td><td class = ''>"
								+ val.ToolName
								+ "</td><td style= 'text-align: left;'>  <a href='#' class = 'itemDesc'>"
								+ val.PartNo
								+ "</a></td> <td class = 'Part_No' style= ''>"
								+ val.DepositQty
								+ "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'make'>"
								+ val.DepositBy
								+ "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'Entry_Date'>"
								+ val.ReceiveBy
								+ "</a></td><td style= 'text-align: left;'>  <a href='#' class = 'Entry_Date'>"
								+ DepositDate
								+ "</a></td></tr>";

							//alert(text);						
							$('#ToolDeposit').find('tbody').append(text);

						});

				$('#ToolDeposit').dataTable(
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

