function GetToolData(UMC_No) {
    debugger
    var umc = UMC_No;

    //var status = 1;

    $.ajax({
        url: '/api/Inventory/GetMatIssuebyUMC',
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
            if (data[0] != null) {
                for (var i = 0; i < data.length; i++) {
                    document.getElementById("Item_Desc").value = data[i].item_desc;
                    document.getElementById("Location").value = data[i].location;
                    document.getElementById("Part_No").value = data[i].part_no;
                    document.getElementById("AvlQty").value = data[i].qty;
                    document.getElementById("emergencyqty").value = data[i].emergency_issue_qty;
                    document.getElementById("emergncyflag").value = data[i].mat_issue_flag;

                    //document.getElementById("Location").value = data[i].Location;
                    document.getElementById("SubLocation").value = data[i].sub_location;
                    var emrgncyqty = data[i].emergency_issue_qty;
                    var matflag = data[i].mat_issue_flag;

                }
            }
            else {
                document.getElementById("Item_Desc").value = "";
                document.getElementById("Location").value = "";
                document.getElementById("Part_No").value = "";
                document.getElementById("AvlQty").value = "";
                document.getElementById("emergencyqty").value = "";
                document.getElementById("emergncyflag").value = "";

                //document.getElementById("Location").value = data[i].Location;
                document.getElementById("SubLocation").value = "";
            }



        }
    })
}
function InsertToolIssueData() {
    debugger
        var itemdesc = document.getElementById("Item_Desc").value;
        var partno = document.getElementById("Part_No").value;
        var avlqty = document.getElementById("AvlQty").value;
        var location = document.getElementById("Location").value;
        var sublocation = document.getElementById("SubLocation").value;
        var Umc = document.getElementById("UMC_No").value;
        var IssueQty = document.getElementById("IssueQty").value;
    var Issueier_Id = document.getElementById("IssueirId").value;
        var ReceiverId = document.getElementById("ReceiverId").value;
        var Remarks = document.getElementById("Remarks").value;
        var IssueDate = document.getElementById("IssueDate").value;
    var type = document.getElementById("type").value;
    var issueflag = document.getElementById("emergncyflag").value;
    var emrgencyQty = document.getElementById("emergencyqty").value;
   
    $('#btnsave').prop('disabled', true);
    var DATA = {
        ToolName: itemdesc, PartNo: partno, ToolQty: avlqty, Location: location, SubLocation: sublocation,
        UMC_No: Umc, IssueQty: IssueQty, IssuierId: Issueier_Id, ReceiverId: ReceiverId, Remarks: Remarks, IssueDate: IssueDate, Issueirtype: type
    };
    if (issueflag == "2" && type == "Emergency") {
        if ((avlqty - emrgencyQty) <= IssueQty) {
            alert("Your Request Qty is not available now ! please contact to Store Incharger.");
            document.getElementById("btnsave").disabled = true;
         
           
        }
        else {
            $.ajax({

                url: '/api/Inventory/ToolIssueData',
                method: 'POST',

                data: DATA,
                dataType: 'json',
                onbeforeUnload: function () {
                    debugger
                    // document.getElementById("plzwt").value = "Login Please Wait..";

                    document.getElementById("btnsave").disabled = true;
                    $('#btnsave').prop('disabled', true);
                },
                success: function (response) {
                    debugger
                    //$("#LogForm")[0].reset();
                    $('#btnsave').prop('disabled', false);
                    location.reload();
                    var data = JSON.parse(response);
                    if (data == true) {
                        alert("Equipement Issued Successful");

                        document.getElementById("btnsave").disabled = false;

                        //document.getElementById("Location") = clear;
                        //document.getElementById("SubLocationName") = clear;
                    } else {
                        alert("Something went Wrong!!");
                    }


                }
            })

        }
    }
    else {
        $.ajax({

            url: '/api/Inventory/ToolIssueData',
            method: 'POST',

            data: DATA,
            dataType: 'json',
            onbeforeUnload: function () {
                debugger
                // document.getElementById("plzwt").value = "Login Please Wait..";

                document.getElementById("btnsave").disabled = true;
                $('#btnsave').prop('disabled', true);
            },
            success: function (response) {
                debugger
                //$("#LogForm")[0].reset();
                $('#btnsave').prop('disabled', false);
                location.reload();
                var data = JSON.parse(response);
                if (data == true) {
                    alert("Equipement Issued Successful");

                    document.getElementById("btnsave").disabled = false;

                    //document.getElementById("Location") = clear;
                    //document.getElementById("SubLocationName") = clear;
                } else {
                    alert("Something went Wrong!!");
                }


            }
        })

    }
}
