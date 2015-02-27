var app = angular.module('myApp');

app.controller('UserDashboardCtrl', function($scope, UserData, $location, FormActivity) {
  console.log(FormActivity)
  $scope.formActivity = FormActivity.data;  
  console.log(UserData.onBoardCompleted)

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
