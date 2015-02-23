var app = angular.module('myApp');
app.service("AdminService", function ($q, $http) {

    this.dashboardData = function (id) {
        return $http({
            method: 'GET',
            url: '/api/admin/dashboard/' + id 
        })
    }

    

});