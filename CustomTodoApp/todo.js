var myApp = angular.module( 'AppName', [] )
myApp.controller('AppController', ['$log', function($log){
    $log.log("This is a log message");

}]);

myApp.controller('AppController2', ['$scope', function($scope) {
    $scope.greeting = "Hello, from the controller!";
}]);