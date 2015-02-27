var app = angular.module('myApp');
app.directive('createForms', function($timeout) {

    return {

        restrict: 'E',
        templateUrl: 'js/views/formview.html',
        scope: {
            info: '=',
            user: '='
        },
        controller:  function ($scope) {
            $scope.formName = $scope.info["data"].name
            console.log($scope.info["data"]["inputs"])
            console.log("user info --- ", $scope.user)
            $scope.go = function (form) {
                console.log(form)
            }
            
        },  

        link: function (scope, el, attrs) {
            var inputs = scope.info["data"]["inputs"]
            console.log(inputs)
            console.log("el is ---", el)
            console.log("user info --- ", scope.user)
            scope.form = {}
            $timeout(function () {



                for (var i = 0; i < inputs.length; i++) {
                    
                    if (inputs[i].autoGenerated) {
                        var newElement  = angular.element(

                    
                        '<div class="input_wrapper">' +
                        '    <label>' + inputs[i].label + '</label>' +
                        '    <div class="input_placeholder">' + scope.user[inputs[i].label] + '</div>' +
                        '</div>' 
                        )

                    } else {

                        var newElement  = angular.element(
                        
                        '<div class="input_wrapper">' +
                        '    <label>' + inputs[i].label + '</label>' +
                        '    <input type="text" ng-model="'+ inputs[i].model + '" placeholder="' + inputs[i].label +'">' +
                        '</div>'
                        )
                    }

                    el.find("#inputs").append(newElement);
                    
                }

            }, 0)    
            

        }
    }


});