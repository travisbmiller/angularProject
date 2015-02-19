var app = angular.module('myApp');

app.service('loginService', function($http, $q) {
  
  this.logIn = function (user) {
    
    var dfd = $q.defer()

    $http({
      method: "POST",
      url: "/api/auth",
      data: {
        email: user.email,
        password: user.password
      }
    })
      .then(function (data) {
        console.log("successful")
        dfd.resolve(data.data)
      }, function (err) {
        dfd.reject(err)
      })

      return dfd.promise
   }

   this.logOut = function () {
    console.log("here")
    return $http({
      method: "GET",
      url: "/api/logout"
    }).then(function (data) {
      console.log(data);
      console.log("successful")
    })
   }

   this.logOutLogIn = function (user) {
    
    var dfd = $q.defer()

    $http({
      method: "POST",
      url: "/api/auth",
      data: {
        email: user,
        password: "password",
        logInLogOut: true
      }
    })
      .then(function (data) {
        dfd.resolve(data.data)
      }, function (err) {
        dfd.reject(err)
      })

      return dfd.promise
   }


})