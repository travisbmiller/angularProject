var app = angular.module('myApp');

app.controller('employeeCtrl', function($scope, employeeData) {
  $scope.employee = employeeData;
  console.log($scope.employee.firstName)


});
