var app = angular.module('myApp');
app.directive('inputValid', function() {
 
  return {

    restrict: 'EA',
    scope: {
      valid: '='
    },
    
    controller: function($scope, formService) {
       $scope.data = formService.data
    },
    link: function (scope, el, attrs) {
    
      var tabCompleteCheck = function(data) {
        var flag = true;
        for (key in data.steps) {
          if (data.steps[key].status === "Required") {
            if (!data.steps[key].completed) {
              flag =  false
            }
          }
        }
        return flag;
      }

      tabCompleteCheck(scope.data[0])

     // onload trigger blue
     

      el.blur(function() {
        if (el.val() !== "") {
          if (scope.valid) {
            for (var i = 0; i < scope.data.length; i++){
              if (scope.data[i].tab === attrs.tab) {
                for (var j = 0; j < scope.data[i].steps.length; j++ ) {
                  
                    if (scope.data[i].steps[j].title === attrs.step ) {
                      scope.data[i].steps[j].completed = true;  
                       
                      if( tabCompleteCheck(scope.data[i]) ) {
                        scope.data[i].completed = true;
                        $('#nextformslide').attr('disabled', false)
                        $('#submitform').attr('disabled', false)
                      } else {
                        scope.data[i].completed = false; 
                        $("#nextformslide").attr('disabled', true)
                        $('#submitform').attr('disabled', true)
                      }  

                      scope.$apply();        
                    }
                  
                }
              }
            }
          }
        } else {
          for (var i = 0; i < scope.data.length; i++){
            if (scope.data[i].tab === attrs.tab) {
              for (var j = 0; j < scope.data[i].steps.length; j++ ) {
                if (scope.data[i].steps[j].title === attrs.step ) {
                  
                  scope.data[i].steps[j].completed = false;  
                  
                  if( tabCompleteCheck(scope.data[i]) ) {
                    scope.data[i].completed = true;
                  } else {
                    scope.data[i].completed = false;
                  } 

                  scope.$apply();             
                }
              }
            }
          }
        }
      })
    }

  }


});
