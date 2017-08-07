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
        $routeProvider.when('/UserEntry', {
            templateUrl: 'admin_page.html',
            controller: 'HomeController'
        })
        $routeProvider.when('/', {
            templateUrl: 'auth.html',
            controller: 'LoginController'
        })
        $routeProvider.when('/ActivityEntry', {
            templateUrl: 'activity_view.html',
            controller: 'activityController'
        })
        $routeProvider.when('/PainEntry',{
                templateUrl: 'pain_view.html',
                controller: 'painController'
        })
        $routeProvider.when('/AssessmentEntry',{
                templateUrl: 'assessment_view.html',
                controller: 'assessmentController'
        }).otherwise({
            redirectTo: 'index.html'
        });
        $locationProvider.html5Mode(true); //Remove the '#' from URL.
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

myapp.controller("painController",function ($scope,$http) {
    $http({
        method : "GET",
        url    : "http://tjrapp.wpi.edu:5353/api/v1/pain-entries",
        params : {}
    }).then(function mySuccess(response){
        console.log(response.data);
        console.log("ddd");
        $scope.painList=response.data;
    },function myError(response){
        $scope.painList=response.statusText;
    });
    function JSONToCSVConvertor(JSONData,ReportTitle,ShowLabel){
        var arrData=typeof JSONData !="object" ? JSON.parse(JSONData) : JSONData;

        var csv='';

        csv +="0 Indicates Male " + '\r\n\n';
        if(ShowLabel){
            var row="";

            for(var index in arrData[0]){
                row +=index+',';
            }

            row=row.slice(0,-1);

            csv +=row+'\r\n';
        }
        for(var i=0;i<arrData.length;i++){
            var row="";

            for(var index in arrData[i]){
                row +='"' + arrData[i][index]+'",';
            }
            row.slice(0,row.length-1);

            csv +=row+'\r\n';

        }
        if(csv ==''){
            alert('Invalid data');
            return;
        }

        var fileName="Pain_";

        fileName+=ReportTitle.replace(/ /g,"_");

        var uri='data:text/csv:charset=utf-8,'+escape(csv);

        var link=document.createElement("a");
        link.href=uri;

        link.style="visibility:hidden";
        link.download=fileName+".csv";


        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
    }
    $scope.createCsv=function(){
        JSONToCSVConvertor($scope.painList,'ALL_data_Angular_King',true);
    }
});

    myapp.controller("activityController",function ($scope,$http) {
        $http({
            method : "GET",
            url    : "http://tjrapp.wpi.edu:5353/api/v1/activity-entries",
            params : {}
        }).then(function mySuccess(response){
            $scope.activityList=response.data;
        },function myError(response){
            $scope.activityList=response.statusText;
        });
        function JSONToCSVConvertor(JSONData,ReportTitle,ShowLabel){
            var arrData=typeof JSONData !="object" ? JSON.parse(JSONData) : JSONData;

            var csv='';

            csv +="0 Indicates Male " + '\r\n\n';
            if(ShowLabel){
                var row="";

                for(var index in arrData[0]){
                    row +=index+',';
                }

                row=row.slice(0,-1);

                csv +=row+'\r\n';
            }
            for(var i=0;i<arrData.length;i++){
                var row="";

                for(var index in arrData[i]){
                    row +='"' + arrData[i][index]+'",';
                }
                row.slice(0,row.length-1);

                csv +=row+'\r\n';

            }
            if(csv ==''){
                alert('Invalid data');
                return;
            }

            var fileName="Activity_";

            fileName+=ReportTitle.replace(/ /g,"_");

            var uri='data:text/csv:charset=utf-8,'+escape(csv);

            var link=document.createElement("a");
            link.href=uri;

            link.style="visibility:hidden";
            link.download=fileName+".csv";


            document.body.appendChild(link);

            link.click();
            document.body.removeChild(link);
        }
        $scope.createCsv=function(){
            JSONToCSVConvertor($scope.activityList,'Data_Activity',true);
        }
    });

    myapp.controller("assessmentController",function ($scope) {   //assessmentController
        console.log("hello");                                //assessmentController
        $scope.message="Hello Assessment"
    })
    .controller("userController",function ($scope,$http) {
        console.log("www");
        $scope.message="User Page";
        $http({
            method : "GET",
            url    : "http://tjrapp.wpi.edu:5353/api/v1/user",
            params : {}
        }).then(function mySuccess(response){
            $scope.userList=response.data;
        },function myError(response){
            $scope.userList=response.statusText;
        });
        function addNewUser(){

        }
        $scope.addUser=function () {
            addNewUser();
        }
    });

