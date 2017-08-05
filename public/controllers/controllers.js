/**
 * Created by kavitabaradur on 7/20/17.
 */


var myapp = angular.module("myapp", ['ngRoute']);

myapp.controller('AppCtrl', ['$scope', '$http',
    function ($scope, $http) {
    console.log("Hello from Controller");
        $scope.validate = function () {
            console.log("Login clicked");
            $http({
                method: 'POST',
                url: '/login',
                data: $scope.input_value
            }).then(function (response){
                console.log(">>>>>>>>>>>>>", response);
            }, function myError(response) {
                console.log("******************")
                $scope.myWelcome = response.statusText;
            });

        };

    }]);
myapp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'admin_page.html',
            controller: 'HomeController'
        })
        $routeProvider.when('/', {
            templateUrl: 'auth.html',
            controller: 'LoginController'
        })
        $routeProvider.when('/activity', {
            templateUrl: 'activity_view.html',
            controller: 'ActivityController'
        }).otherwise({
            redirectTo: 'index.html'
        });
        //$locationProvider.html5Mode(true); //Remove the '#' from URL.
    }
]);

myapp.controller("LoginController", function ($scope, $location, $http) {
    $scope.validate = function () {
        console.log("Login clicked");
        $http({
            method: 'POST',
            url: '/login',
            data: $scope.input_value
        }).then(function (response) {
            console.log(">>>>>>>>>>>>>", response);
            if (response.data == "true")
                $location.path("/admin");
        }, function myError(response) {
            console.log("******************")
            $scope.myWelcome = response.statusText;
        });

    };
});

myapp.controller("HomeController", function ($scope, $http) {
        $http({
            method: 'GET',
            url: '/api/v1/user',
            params: {}
        }).then(function mySuccess(response) {
            $scope.users = response.data;
          //  $location.path("/activity");
        }, function myError(response) {
            $scope.users = response.statusText;
        });

});

myapp.controller("ActivityController", function ($scope, $http) {
       $http({
           method: 'GET',
           url: 'http://tjrapp.wpi.edu:5353/api/v1/activity-entries',
           params: {}
       }).then(function mySuccess(response) {
           $scope.activityList = response.data;
       }, function myError(response) {
           $scope.activityList = response.statusText;
       });

});

