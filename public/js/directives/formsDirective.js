var app = angular.module('myApp');
app.directive('forms', function($route) {
 
  return {

    restrict: 'EA',
    templateUrl: 'js/views/forms.html',
    scope: {
      user: '='
    },
    controller: function($scope, formService, $location, UserService ) {
       
      $scope.data = formService.data;
      
      $scope.updateUser = function (user) {
        console.log("updateUser clicked")
        UserService.UpdateUser(user)
          .then(function (res) {
            console.log("successful update ", res)
          }, function (err) {
            console.log("err ", err)
          })
      }
      
    },
    link: function (scope, el, attrs) {
  
      // $(document).ready(function(){
        
      //   alert('clicked: ');
      //   //$('input').trigger('blur')
      //   $( "input" ).blur()
      // });

      var currentPanel = "panel1"
      var currentIndex = 0;
      scope.currentIndex = currentIndex;

      // Setting back button to disabled when on panel 1
      scope.backDisabled = true;
      
      // count how many panels
      scope.panelCount = $('.panels').length -1;
     
      
      scope.updatePaneladd = function () {
        currentIndex++;
        scope.currentIndex = currentIndex;
  
        if(currentIndex > 0) {
          scope.backDisabled = false;
        }
      }

      scope.updatePanelMinus = function () {
        currentIndex--;
        scope.currentIndex = currentIndex;
        if(currentIndex <= 0) {
          scope.backDisabled = true;
        }
      }

      $('.moveleft').click(function(){
    
        if ( $("#"+currentPanel).attr('id') !== $('.form_container').children().last().attr('id') ) {
          $("#"+currentPanel).removeClass('center');
          $("#"+currentPanel).addClass('left');
          $("#"+currentPanel).next().addClass('center');
          currentPanel = $("#"+currentPanel).next().attr('id');

          // Close open tab in side bar
          //$('.steptab').children('.dropDownBody')[0].slideUp()

        }
        console.log(currentPanel)

      })

      $('.moveright').click(function(){
        
        if ( $("#"+currentPanel).attr('id') !== $('.form_container').children().first().attr('id') ) {
          $("#"+currentPanel).removeClass('center');
          $("#"+currentPanel).prev().removeClass('left');
          $("#"+currentPanel).prev().addClass('center');
          currentPanel = $("#"+currentPanel).prev().attr('id')
        }
        console.log(currentPanel)
      })

      
      // Watching for when currentIndex changes and controlling disabled vale on next button
      scope.$watch(function() {
            return currentIndex;
      },
      function listener() {
        
        if( scope.data[currentIndex].completed )  {
          $('#nextformslide').attr('disabled', false)
        } else {
          $("#nextformslide").attr('disabled', true)
        }

        if (currentIndex === scope.panelCount) {
          if (scope.data[currentIndex].completed) {
            $('#submitform').attr('disabled', false)
          } else {
            $("#submitform").attr('disabled', true)
          }
          
        }
       
      })

       


    


    }



  }


});
