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
        
        console.log("data from MainCtrl ---- ", user);
        $location.path('/employee/' + user._id);

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

