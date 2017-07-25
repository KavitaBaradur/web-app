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

myapp.controller("HomeController", function ($scope, $location) {
    $http({
        method: 'GET',
        url: '/admin'
    }).then(function (response) {
        console.log(">>>>>>>>>>>>>", response);
        if (response.data == "true") {
            response.json();
        }
    }, function myError(response) {
        console.log("******************")
        $scope.myWelcome = response.statusText;
    });

});

