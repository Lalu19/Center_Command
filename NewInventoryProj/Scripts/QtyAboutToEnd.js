$(document).ready(function () {
    // Flag to check if any item quantity is less than minimum quantity
    var qtyAboutToEnd = false;

    $.ajax({
        url: '/api/Inventory/GetMinimumStoreQty',
        type: 'POST',
        datatype: 'json',
        success: function (data) {
            console.log(data); // Log the response to see its structure

            $('#QtyData').find('tbody').empty();

            // Remove the following line if not needed
            // var jsonData = JSON.parse(data); 

            $.each(data, function (i, val) {
                var text = "<tr><td>"
                    + val.UMC_No
                    + "</td><td>"
                    + val.item_desc
                    + "</td><td>"
                    + val.min_qty
                    + "</td><td>"
                    + val.total_qty
                    + "</td>"
                    + "</tr>";

                // Check if quantity is less than minimum quantity
                if (val.total_qty < val.min_qty) {
                    qtyAboutToEnd = true;
                }

                $('#QtyData').find('tbody').append(text);
            });

            $('#QtyData').dataTable({
                "lengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
                autoWidth: false,
                responsive: true,
                "drawCallback": function (settings) {
                    // Add any necessary callbacks
                },
            });
        }
    });
});
