app.controller('MainController', function ($scope, $timeout, loginService, $location) {

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

  var loginCallback = function(user){
    user.uid = user.uid.replace('simplelogin:', '');
    $scope.$apply(function(){
      $location.path('/employee/' + user.uid)
    });
  };

  $scope.loginuser = function () {
    console.log("ctrl");
    return loginService.login($scope.user, loginCallback);
  }

  $scope.register = function (user) {
    console.log(user);
    return loginService.register($scope.user, loginCallback);
  }
  $scope.test = function(){
    console.log("test");
  }
  

});

