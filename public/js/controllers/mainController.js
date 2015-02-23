var app = angular.module('myApp');
app.controller('MainController', function ($scope, $timeout, $location, loginService) {

  $timeout(function() {
    $scope.delaytime = true;
    console.log("fired")
  }, 500);

  $scope.loginshow = true;
  $scope.registershow = false;

  $scope.changeView = function () {
    $scope.loginshow = !$scope.loginshow;
    $scope.registershow = !$scope.registershow;
  }

  $scope.logIn = function (loginInfo) {
    
    loginService.logIn(loginInfo)
      .then(function (user) {
        
        if (user.userRole !== "Admin") {
            $location.path('/dashboard/' + user._id);
         } else {
            $location.path('/a/dashboard/' + user._id);
         }

      }, function (err) {
        console.log("Err --- ", err)
      })
  }

  $scope.createNewUser = function () {
    //show modal


    // fill in basic user info
    // choose whether or not to on board now or later
  }

});

