var app = angular.module('myApp');
app.controller('employeeListController', function($scope, createNewUser, $location){
  
  $scope.employees;

  $scope.gotoUser = function (emp) {
    $location.path('/employee/' + emp.$id)
  }

});