var phone = angular.module('Phone', [])


.controller('controller1', ['$scope',  function($scope){


    $scope.contacts = []

    function generateRandomId(len){
       var str = "sfbbsgbushgisgDSFIIISIDN@#&DS(+(FISSFDDFISGSGG"
       var id = ''
       for (var i = 0; i<len; i++){
        var index = Math.floor(Math.random()* str.length)
        id += str[index]
       }
       return id

    }

    $scope.addContact = function(){
        var newId = generateRandomId(5)
        $scope.contacts.push({
            id : newId,
            name : $scope.newName,
            email : $scope.newEmail,
            address : $scope.newAddress
        })
        console.log($scope.contacts)
        $scope.newName = '';
        $scope.newEmail = '';
        $scope.newAddress = '';
        
    }

    $scope.delete = function(index){
        $scope.contacts.splice(index, 1)
    }

    $scope.edit = function(index){
        alert(index)
    }

































}])