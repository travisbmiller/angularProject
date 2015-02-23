var app = angular.module('myApp', ['ui.router','ui.bootstrap']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
      url: "/",
      templateUrl: "js/views/login.html",
      controller: 'MainController'
    })
  .state('adminDashboard', {
      url: "/a/dashboard/:id",
      templateUrl: 'js/views/admindashboard.html',
      controller: 'adminDashboardCtrl',
      resolve: {
          UserData: function($stateParams, UserService) {
            return UserService.getUser($stateParams.id)
          },
          AdminData: function($stateParams, AdminService){
              return AdminService.dashboardData($stateParams.id);
          }
      }  
  })
  .state('adminDashboard.addemployee', {
        // loaded into ui-view of parent's template
        templateUrl: 'js/views/adduser.html',
        url: '/addemployee',
        controller: 'adminDashboardCtrl'
    })
  .state('adminDashboard.employeeprofile', {
        templateUrl: 'js/views/userProfile.html',
        url: '/profile/:id',
        controller: function ($scope, ProfileData, Notes) {
          $scope.profileUser = ProfileData
          $scope.notes = Notes
          console.log(Notes)
        },
        resolve: {
            ProfileData: function (UserService, $stateParams) {
                return UserService.getUser($stateParams.id)
                .then(function (user) {
                  console.log(user)
                  return user
                }, function (err){
                  return err
                })
            },
            Notes: function (UserService, $stateParams) {
              return UserService.getNotes($stateParams.id)
                .then(function (results) {
                  return results.data
                }, function (err){
                  return err
                })
            }
        }
    })
  .state('adminDashboard.employees', {
        // loaded into ui-view of parent's template
        templateUrl: 'js/views/listemployees.html',
        url: '/employees',
        controller: function ($scope, Users, $state) {
          
          $scope.users = Users;
          
          $scope.show = false;
          
          $scope.goToProfile = function (id) {
            $state.go('adminDashboard.employeeprofile', {id: id})
          }
          

          $scope.showNoteModel = function (user) {
            console.log("show Note Model")
            $scope.show = true;
            $scope.seletedUser = user;

            console.log($scope.seletedUser)
          }

        },
        resolve: {
          Users: function (UserService) {
            return UserService.getUsers()
            .then(function (results) {
              console.log(results)
              return results.data
            }, function (err){
              return err
            })
          }
        }
    })
  .state('userDashboard', {
      url: "/dashboard/:id",
      templateUrl: 'js/views/employeepageTemplate.html',
      controller: 'UserDashboardCtrl',
      resolve: {
        UserData: function ($stateParams, UserService) {
          return UserService.getUser($stateParams.id)
        }
      }
  })
  .state('onBoard',{
    url: '/onboard/:id',
    templateUrl: 'js/views/formtemplate.html',
    controller: 'OnboardController',
    resolve: {
      UserData: function ($stateParams, UserService) {
        return UserService.getUser($stateParams.id)
      }
    }
  })

  $urlRouterProvider.otherwise('/');


//   .when('/', {
//     templateUrl: 'js/views/login.html',
//     controller: 'MainController'
//   })
//   .when('/onboard/:id', {
//     templateUrl: 'js/views/formtemplate.html',
//     controller: 'OnboardController',
//     resolve: {
//       UserData: function ($route, UserService) {
//         return UserService.getUser($route.current.params.id)
//       }
//     }
//   })
//   .when('/employees', {
//     templateUrl: 'js/views/employees.html',
//     controller: 'employeeListController'
//   })
//   .when('/employee/:id', {
//     templateUrl: 'js/views/employeepageTemplate.html',
//     controller: 'UserDashboardCtrl',
//     resolve: {
//       UserData: function($route, UserService) {
//         return UserService.getUser($route.current.params.id)
//       }
//     }
//   })
//   .when('/employee/a/:id', {
//     templateUrl: 'js/views/admindashboard.html',
//     controller: 'adminDashboardCtrl',
//     resolve: {
//         UserData: function($route, UserService) {
//           return UserService.getUser($route.current.params.id)
//         },
//         AdminData: function($route, AdminService){
//             return AdminService.dashboardData($route.current.params.id);
//         }
//     }  
// }).otherwise({ redirectTo: '/' })
});