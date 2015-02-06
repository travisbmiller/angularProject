var app = angular.module('myApp');

app.service('loginService', function(nzSwal, $location, $firebase) {
  
  //Just a reference to the firebase endpoint
  var firebaseUrl = "https://scorching-fire-6109.firebaseio.com/app";
  //Creates an object using the Firebase Constructor with our endpoint passed in
  var firebaseLogin = new Firebase(firebaseUrl);

  

  //login method to be called from our controller. The callback is then passed the authenticated user
  this.login = function(user, cb){
    console.log("service");
    var loginCallback = function(err, authData) {
      console.log("callback");
    if (err) {
      switch (err.code) {
        case "INVALID_EMAIL":
          // handle an invalid email
          case "INVALID_PASSWORD":
          // handle an invalid password
          default:
        }
    } else if (authData) {
        var onboarded = $firebase(new Firebase("https://scorching-fire-6109.firebaseio.com/app/users/" + authData.uid.replace("simplelogin:", "") + "/onboarded")).$asObject();
        // user authenticated with Firebase
        console.log(onboarded);
        // cb(authData); //gives the authenticated user to our callback
    }
  };
    firebaseLogin.authWithPassword({
      email : user.email,
      password : user.password
    }, loginCallback);
  };

  //Step 3 of Registration
  this.register = function(user, cb){
    firebaseLogin.createUser({
      email: user.email,
      password: user.password
    }, function(error) {
        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              console.log("The new user account cannot be created because the email is already in use.");
              break;
            case "INVALID_EMAIL":
              console.log("The specified email is not a valid email.");
              break;
            default:
              console.log("Error creating user:", error);
          }
        } 
        else {
            console.log("User created successfully");
            firebaseLogin.authWithPassword({
              email : user.email,
              password : user.password
            }, function(err, authData) {
                if (err) {
                  switch (err.code) {
                    case "INVALID_EMAIL":
                      // handle an invalid email
                      case "INVALID_PASSWORD":
                      // handle an invalid password
                      default:
                    }
                } else if (authData){
                  authData.timestamp = new Date().toISOString();
                  nzSwal({
                    title: "Onboard now?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#4EA0EA',
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: true
                    })
                    .then(function() {
                      $location.path("/onboard/"+authData.uid.replace("simplelogin:", ""))
                      authData.onboarded = true;
                      firebaseLogin.child('users').child(authData.uid.replace('simplelogin:', '')).set(authData);

                    })
                    .catch(function() {
                       authData.onboarded = false;
                      firebaseLogin.child('users').child(authData.uid.replace('simplelogin:', '')).set(authData);
                    });
                }
              });
        }
    });
  };



})