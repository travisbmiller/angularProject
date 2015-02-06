var app = angular.module('myApp', ['firebase','ngRoute', 'nzSweetAlert']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'js/login.html',
    controller: 'MainController'
  })
  .when('/onboard/:uid', {
    templateUrl: 'js/formtemplate.html',
    controller: 'MainController'
  })
  .when('/employees', {
    templateUrl: 'js/employees.html',
    controller: 'employeeListController'
  })
  .when('/employee/:employeeNumber', {
    templateUrl: 'js/employeepageTemplate.html',
    controller: 'employeeCtrl',
    resolve: {
      employeeData: function($route, createNewUser) {
        return createNewUser.getEmployee($route.current.params.employeeNumber)
      }
    }
  })
  .otherwise({ redirectTo: '/' })
});
