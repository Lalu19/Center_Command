$('#btn1').click(function ()
{
    var UMC_No = $('#UMC_No').val();
    var Item_Desc = $('#Item_Desc').val();
    var UOM = $('#UOM').val();
    var Qty = $('#Qty').val();
    var Unit_Price = $('#Unit_Price').val();
    var IssueDate = $('#IssueDate').val();
    var Name = $('#Name').val();
    var EmpId = $('#EmpId').val();
    var ReservationNo = $('#ReservationNo').val();



    if (UMC_No == "" || Item_Desc == "" || UOM == "" || Qty == "" || Unit_Price == "" || IssueDate == "" || Name == "" || EmpId == "" || ReservationNo == "") {
        alert("Fields can't be empty");


        }
});

    $(document).ready(function(){

$("#hide").hide();

  $("#show").click(function(){
        $("#hide").show();
  });

});
