var app = angular.module('myApp')

app.controller('adminDashboardCtrl', function ($scope, UserData, UserService, $location, loginService) {

    $scope.user = UserData;
   
    $scope.createUserModalshow = false;

    $scope.createNewUser = function () {
        $scope.createUserModalshow = true;
    }

    $scope.viewUsers = function () {
        UserService.getUsers().then(function (res){
            console.log("Users: ", res)
        }, function (err) {
            console.log("err in getting Users", err)
        })
    }

    $scope.viewUsers = function () {
        console.log("clicked")
        UserService.getUsers()
            .then(function (results) {
                console.log(results)
            }, function (err) {
                console.log(err)
            })
    }



      $scope.oneAtATime = true;

      $scope.groups = [
        {
          title: 'Dynamic Group Header - 1',
          content: 'Dynamic Group Body - 1'
        },
        {
          title: 'Dynamic Group Header - 2',
          content: 'Dynamic Group Body - 2'
        }
      ];

      $scope.items = ['Item 1', 'Item 2', 'Item 3'];

      $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
      };

      $scope.status = {
        isFirstOpen: false,
        isFirstDisabled: false
      };


        $scope.showForm = true;
        $scope.onboardNow = false

        $scope.next = function (User) {
            console.log(User)
            
            UserService.createNewUser(User)
                .then(function (res) {
                    console.log(res)
                     $scope.showForm = false;
                     $scope.onboardNow = true;
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
            



})