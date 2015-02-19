var app = angular.module('myApp');
app.directive('createUserModal', function() {
 
  return {

    restrict: 'E',
    templateUrl: 'js/views/createUserModal.html',
    scope: {
        model: '='
    },
    controller:  function ($scope, $location, UserService, loginService) {
        
        $scope.showForm = true;
        $scope.nowBoardNow = false

        $scope.next = function (newUser) {
            console.log(newUser)
            UserService.createNewUser(newUser)
                .then(function (res) {
                    console.log(res)
                     $scope.showForm = false;
                     $scope.nowBoardNow = true;
                }, function (err) {
                    console.log(err)
                })
        }

        $scope.cancel = function () {
            $scope.newUser = {};
            $scope.model = false;
        }

        $scope.no = function () {
            $scope.newUser = {}
            $scope.model = false;
        }

        $scope.yes = function (user) {
            console.log(user)
           
            // clear user obj
            //$scope.newUser = {}
            // close modal
            //$scope.model = false;

            // logout current user
                // go to api to log out
                // go in new user + redirect
            loginService.logOutLogIn(user)
                .then(function (data) {
                    // clear user obj
                    $scope.newUser = {}
                    // close modal
                    $scope.model = false;
                    // redirect 
                    $location.path('/employee/' + data._id);
                    
                }, function (err) {

                    console.log("Err --- ",err)
                })
            

           


        }
        
    },
    link: function (scope, el, attrs) {
      
        
    }

  }


});