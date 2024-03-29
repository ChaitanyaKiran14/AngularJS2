var app=angular.module("myapp",[]);

app.controller("appController",
['$scope','$log','$rootScope',function($scope,$log,$rootScope){

    $scope.callChild=function(){
        $scope.$broadcast("child","test value from parent"); 
    }

    $scope.$on('parent',function(evant,value){
        alert(value);
    });

    $scope.parentMethod=function(){

        alert('parent method');
    }

    $scope.changeText=function(){
        $log.log('test...');
        $rootScope.
        $broadcast('change_text',$scope.text);
    }

    $rootScope.name="Nikhil....";

   

}]);


app.controller('appController2',['$scope','$log',function($scope,$log){

$scope.text="Hello AngularJS!";

$scope.$on('change_text',function(event,newValue){
    $scope.text=newValue;
});


}]);








app.controller("appControllerChild",
["$scope",'$log',function($scope,$log){

    $scope.$on('child',function(event,param){
     alert('Value from parent '+param);
    });

    $scope.callParent=function(){   
        $scope.$emit('parent','calling from child controller');
    }

}]);



