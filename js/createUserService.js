var app = angular.module('myApp');
app.service('createNewUser', function ($firebase, $q) {
  
  var firebaseUrl = "https://scorching-fire-6109.firebaseio.com/app";


  this.createUser = function (user) {
    return $firebase(new Firebase(firebaseUrl + '/users/' + user));
  }

  this.getUsers = function (user) {
    return $firebase(new Firebase(firebaseUrl + '/users'));
  }

  this.getEmployee = function (id) {
    var dfd = $q.defer() 
    var sync = $firebase(new Firebase(firebaseUrl + "/users/" + id));
    sync.$asObject().$loaded().then(function (data) {
      dfd.resolve(data)
    })
    return dfd.promise
  }


});