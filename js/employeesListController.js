var app = angular.module('myApp');
app.controller('employeeListController', function($scope, createNewUser, $firebase, $location){
  
  $scope.employees;

  var getUsers = function () {
    var ref = createNewUser.getUsers()
    $scope.employees = ref.$asArray()
    console.log(ref);
    console.log(ref.$asArray())
  }

  getUsers()

  console.log($scope.employees)

  $scope.gotoUser = function (emp) {
    $location.path('/employee/' + emp.$id)
  }

});