retrieveData();

function retrieveData(){
        $.ajax({
                url: libraryURL +  "/read-records",
                type: "get",
                success: function(response){
           //     var data = jQuery.parseJSON(response);
                console.log("I'm here");
                createLibraryTable(response);
            }
        });
}

function createLibraryTable(libraryData){
var tableHTML = " ";

for(var i=0; i<libraryData.length; i++){
    tableHTML += "<tr>";
        tableHTML += "<td>" + libraryData[i]._id + "</td>";
        tableHTML += "<td>" + libraryData[i].bookTitle + "</td>";
        tableHTML += "<td>" + libraryData[i].author + "</td>";
        tableHTML += "<td>" + libraryData[i].publisher + "</td>";
        tableHTML += "<td>" + libraryData[i].yearPublished + "</td>";
        tableHTML += "<td>" + libraryData[i].isbn + "</td>";
        tableHTML += "<td>" + "<button class='delete_button' data-id='" + libraryData[i]._id + "'>delete pls :)</button>" + "</td>";
        tableHTML += "</tr>"
}
$('#libraryTable').html(tableHTML);
activateDelete();
}

function activateDelete() {
    $('.delete_button').click(function() {
        var deleteID = this.getAttribute("data-id");
        
        $.ajax({
        url: libraryURL + "/delete-record",
        type:"delete",
        data: {deleteID: deleteID},
        success: function(response){
            if(response = "SUCCESS") {
                retrieveData();  
            } else {
                alert(response);
            }
        },
        error: function(err){
            alert(err);
        }
        });

    });
}
