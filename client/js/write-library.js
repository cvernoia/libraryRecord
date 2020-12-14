var app = angular.module("addLibraryApp",[]);    

app.controller("addLibraryCtrl", function($scope,$http) {
    $scope.dataSubmit = function(){
        $http({
            method: "post",
            url: libraryURL + "/write-library",
            data: {
                "bookTitle": $scope.bookTitle,
                "author": $scope.author,
                "publisher": $scope.publisher,
                "yearPublished": $scope.yearPublished,
                "isbn": $scope.isbn
            }

        }).then(function(response) {
            if(response.data.msg === "SUCCESS"){           
             $scope.bookTitle = "";
            $scope.author = "";
            $scope.publisher = "";
            $scope.yearPublished = "";
            $scope.isbn = "";
            $scope.addResults = "Book is added";
            }else{
                $scope.addResults = response.data.msg;
            }
        }, function(response) {
            console.log(response);
        });
    };
});

     
     
   
  
