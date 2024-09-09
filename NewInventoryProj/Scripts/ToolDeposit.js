function GetToolData(UMC_No) {
    debugger
    var umc = UMC_No;

    //var status = 1;

    $.ajax({
        url: '/api/Inventory/GetDataByUmcForToolDeposit',
        method: 'POST',

        data: { UMC_No: umc },
        dataType: 'json',
        onbeforeUnload: function () {
            // document.getElementById("plzwt").value = "Login Please Wait..";
        },
        success: function (response) {
            debugger
            //$("#LogForm")[0].reset();
            var data = JSON.parse(response);
            for (var i = 0; i < data.length; i++) {
                document.getElementById("Item_Desc").value = data[i].ToolName;
                //document.getElementById("Location").value = data[i].Location;
                document.getElementById("Part_No").value = data[i].PartNo;
                //document.getElementById("AvlQty").value = data[i].Qty;

                //document.getElementById("Location").value = data[i].Location;
                //document.getElementById("SubLocation").value = data[i].Sub_Location;
            }
        }
    })
}

function InsertToolDepositData() {
    debugger
    var itemdesc = document.getElementById("Item_Desc").value;
    var Umc = document.getElementById("UMC_No").value;
    var partno = document.getElementById("Part_No").value;

    var DepositQty = document.getElementById("DepositQty").value;
    var DepositBy = document.getElementById("DepositBy").value;
    var ReceiveBy = document.getElementById("ReceiveBy").value;
    var DepositDate = document.getElementById("DepositDate").value;
    var Remarks = document.getElementById("Remarks").value;

    var DATA = {
        ToolName: itemdesc, PartNo: partno, DepositQty: DepositQty, DepositBy: DepositBy, ReceiveBy: ReceiveBy, UMC_No: Umc, DepositDate: DepositDate, Remarks: Remarks
    };
    $.ajax({
        url: '/api/Inventory/InsertToolDepositData',
        method: 'POST',

        data: DATA,
        dataType: 'json',
        onbeforeUnload: function () {
            // document.getElementById("plzwt").value = "Login Please Wait..";
        },
        success: function (response) {
            debugger
            //$("#LogForm")[0].reset();

            var data = JSON.parse(response);
            if (data == true) {
                location.reload();
                alert("Tool Deposited Successful");

                //document.getElementById("Location") = clear;
                //document.getElementById("SubLocationName") = clear;
            } else {
                alert("Something went Wrong!!");
            }


        }
    })
}
