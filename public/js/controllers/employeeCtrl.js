var app = angular.module('myApp');

app.controller('UserDashboardCtrl', function($scope, UserData, $location) {

  if (!UserData.onBoardCompleted) {
    $location.path('/onboard/' + UserData._id)   
  }

  $scope.user = UserData;
   console.log(UserData)
  $scope.createUserModalshow = false;

  $scope.createNewUser = function () {
    $scope.createUserModalshow = true;
  }

});
