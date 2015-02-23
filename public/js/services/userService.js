var app = angular.module('myApp');
app.service("UserService", function ($q, $http) {
  
  

  this.getUser = function (id) {
    var dfd = $q.defer()

    $http({
      method: "GET",
      url: "/api/employee/" + id 
    }).then(function (data) {
      console.log("successful")
      console.log("data", data.data)
      dfd.resolve(data.data)
    }, function (err) {
      dfd.reject(err)
    })

    return dfd.promise
   }

   this.getUsers = function () {

    return $http({
      method: "POST",
      url: "/api/employees"
    })

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
        store: user.store,
        email: user.email,
        position: user.position,
        password: "password",
        status: "pending",
        userRole: "user"
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

  this.addNote = function (note) {
    return $http({
      method: "POST",
      url: 'api/addnote',
      data: note
    })
  }

  this.getNotes = function (id) {
    return $http({
      method: "GET",
      url: 'api/getnotes/' + id
    })
  }
  


});