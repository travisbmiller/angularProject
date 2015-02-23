var app = angular.module('myApp');
app.directive('noteModal', function() {
 
  return {

    restrict: 'E',
    templateUrl: 'js/views/createUserModal.html',
    scope: {
        user: '=',
        model: "=",
        submittedby: "="
    },
    controller:  function ($scope, $location, UserService) {
        
        console.log($scope.user)
        console.log($scope.submittedby)
        $scope.cancel = function (note) {
            $scope.note = {};
            $scope.model = false;
        }

        $scope.submitNote = function (note) {
            
            

            var newNote = {
                user: $scope.user._id,
                submittedBy: $scope.submittedby._id,
                subject: note.subject,
                note: note.text
            }

            console.log(newNote)

            UserService.addNote(newNote)
                .then(function (data) {
                    // clear user obj
                    $scope.note = {}
                    // close modal
                    $scope.model = false;
                
                
                }, function (err) {

                    console.log("Err --- ",err)
                })
            

           


        }
        
    },
    link: function (scope, el, attrs) {
      
        
    }

  }


});