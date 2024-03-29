var app = angular.module('myApp', []);

app.service("contactBook", ['$http', function ($http) {
    var baseUrl = 'https://6604f29b2ca9478ea17ed412.mockapi.io/api/contacts/contacts';

    this.getAllContacts = function () {
        return $http.get(baseUrl);
    };

    this.addNewContact = function (contact) {
        return $http.post(baseUrl, contact);
    };

    this.updateContact = function (contact) {
        var url = baseUrl + '/' + contact.id;
        return $http.put(url, contact);
    };

    this.deleteContact = function (contactId) {
        var url = baseUrl + '/' + contactId;
        return $http.delete(url);
    };
}]);

app.controller('myController', ['$scope', 'contactBook', function($scope, contactBook){
    $scope.contacts = [];
    $scope.addNewContact = {};
    $scope.editing = null;

    $scope.init = function(){
        $scope.getAllContacts();
    };

    $scope.getAllContacts = function(){
        contactBook.getAllContacts()
            .then(function(response){
                $scope.contacts = response.data;
                console.log(response.data)
            })
            .catch(function(error){
                console.log('Error: ', error);
            });
    };

    $scope.clickFunction  = function(){
        alert("Ok CHAITU YOU ARE GOOD TO GO");
    };

    $scope.editContact = function(){
        alert("Edit button working");
    };

    $scope.deleteContact = function(){
        alert('Delete Working');
    };

    $scope.formSubmit = function(){
        var name = $scope.name;
        var number = $scope.number;
        var address = $scope.address;
        alert(name + ' '+ number + ' '+ address);
    };
}]);
