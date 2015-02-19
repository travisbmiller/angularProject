var app = angular.module('myApp');
app.service("UserService", function ($q, $http) {
  
  

  this.getUser = function (id) {
    var dfd = $q.defer()

    $http({
      method: "GET",
      url: "/api/employee/" + id 
    }).then(function (data) {
      console.log("successful")
      dfd.resolve(data.data)
    }, function (err) {
      dfd.reject(err)
    })

    return dfd.promise
   }

  this.createNewUser = function (user) {

    var user = user

    return $http({
      method: "POST",
      url: "/api/employee",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.firstName + " " + user.lastName,
        email: user.email,
        password: "password"
      }
    })
  }

  this.UpdateUser = function (user) {
    return $http({
      method: "PUT",
      url: "/api/employee/" + user._id,
      data: user
    })
  }
  


});