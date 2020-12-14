var records = [];
var activeRecords = 0;

var app = angular.module("readRecordsApp",[]);

app.controller("readRecordsCntrl",function($scope,$http){
$scope.obj = [];

$scope.read_records = function () {
$http({
    method: "get",
    url: 'http://localhost:4400/read-records'
    
    }).then(function (response) {
    records = response.data;
    $scope.obj = records[activeRecords];
    $scope.showHide();
    
    }, function (response) {
    console.log(response);
    
    });
}

$scope.read_records();

$scope.changeRecords = function(direction){
    activeRecords += direction;
    $scope.obj = records[activeRecords];
    $scope.showHide();
}
$scope.showHide = function(){
    $scope.hidePrev = (activeRecords === 0) ? true : false;
    $scope.hideNext = (activeRecords === records.length-1) ? true : false;
}
});