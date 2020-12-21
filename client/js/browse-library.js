let records = [];

let app = angular.module("browseRecordsApp", []);

app.controller("browseRecordsController", function ($scope, $http) {
    $scope.records = []
    $scope.editId = null,
    $scope.newBookTitle = '',
    $scope.newAuthor = '',
    $scope.newPublisher = '',
    $scope.newYearPublished = '',
    $scope.newIsbn = ''
    
    $scope.read_records = function() {
        $http({
            method: "get",
            url: libraryURL +  "/read-records"
        }).then(function (res) {
            records = res.data;
            $scope.records = records;
        });
    }
    
    $scope.delete_record = function(deleteID) {     
        $http({
            method: "delete",
            url: libraryURL +  "/delete-record",
            data: {"deleteID": deleteID}
        }).then(function (res) {
            $scope.read_records(); 
        })
    }
    
    $scope.getByAuthor = function() {
        $http({
            method: "get",
            url: libraryURL +  "/type-records",
            params: {"author": $scope.author}
        }).then(function(res) {
            $scope.records = res.data;
        }), function(err){
            $scope.records = null;
        }
        
    }
    $scope.update_record = function () {
        
        $http({
            method: "put",
            url: libraryURL +  "/update-record",
            data: {
                deleteID: $scope.editId,
                bookTitle: $scope.newBookTitle,
                author: $scope.newAuthor,
                publisher: $scope.newPublisher,
                yearPublished: $scope.newYearPublished,
                isbn: $scope.newIsbn
            }
        }).then(function(res) {
            $scope.read_records(); 
        })
        
        $scope.editId = null;
    }
    
    $scope.toggle_edit = function (record) {
        $scope.editId = record._id;
        $scope.newBookTitle = record.bookTitle;
        $scope.newAuthor = record.author;
        $scope.newPublisher = record.publisher;
        $scope.newYearPublished = record.yearPublished;
        $scope.newIsbn = record.isbn;
    }
    $scope.read_records();
    
});
