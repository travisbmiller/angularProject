var app = angular.module('myApp');
app.directive('side', function($timeout) {
 
  return {

    restrict: 'EA',
    templateUrl: 'js/sideBarDirective.html',
    // scope: {},
    controller: function($scope, formService) {
        $scope.data = formService.data;
        
        $scope.changePanel = function (index) {
          console.log(index)
        }

    },
    link: function (scope, el, attrs) {
      
      $timeout(function() {
        
        $('.steptab').on('click', function() {
          console.log('click')
        
        $(this).children('.dropDownBody').slideToggle();
        });

        $('.dropDownBody').hide();
      
        },0)

    

    }

  }


});

