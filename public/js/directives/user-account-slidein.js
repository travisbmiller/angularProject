var app = angular.module('myApp');
app.directive('userAccountSidein', function() {
 
  return {

    restrict: 'E',
    templateUrl: 'js/views/userAccountSlidein.html',
    scope: {
      user: '='
    },
    controller:  function ($scope, $location) {
        $scope.logOut = function () {
          $location.path('/api/logout')
        }
    },
    link: function (scope, el, attrs) {
      
        $('#usericon').on('click', function () {
            //Slide in User Account Dropdown
            if ($("#useraccountslidein").hasClass('useraccount_slidein')) {
                $("#useraccountslidein").removeClass('useraccount_slidein');
            } else {
                $("#useraccountslidein").addClass('useraccount_slidein');
            };
        });
    }

  }


});