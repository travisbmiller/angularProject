var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'js/views/login.html',
    controller: 'MainController'
  })
  .when('/onboard/:id', {
    templateUrl: 'js/views/formtemplate.html',
    controller: 'OnboardController',
    resolve: {
      UserData: function ($route, UserService) {
        return UserService.getUser($route.current.params.id)
      }
    }
  })
  .when('/employees', {
    templateUrl: 'js/views/employees.html',
    controller: 'employeeListController'
  })
  .when('/employee/:id', {
    templateUrl: 'js/views/employeepageTemplate.html',
    controller: 'UserDashboardCtrl',
    resolve: {
      UserData: function($route, UserService) {
        return UserService.getUser($route.current.params.id)
      }
    }
  })
  .otherwise({ redirectTo: '/' })
});
