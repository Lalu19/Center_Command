function SetBudget() {
    var Budgetdata = document.getElementById("Budgetdate").value;
    var materialAmt = document.getElementById("MaterialAmt").value;
    var ServiceAmt = document.getElementById("ServiceAmt").value;
    $.ajax({
        url: '/api/Inventory/SetActualBudget',
        dataType: 'json',
        type: 'Post',
        data: { BudgetDate: Budgetdata, MaterialAmt: materialAmt, ServiceAmt: ServiceAmt },

        success: function (data) {
            //var data = $.parseJSON(data);
            if (data == true) {
                alert("Actual Budget Added Succesfully");
                location.reload();

            } else {
                alert("Something went Wrong");
            }
        }
    })
}