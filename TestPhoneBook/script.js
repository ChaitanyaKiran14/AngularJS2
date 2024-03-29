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

app.controller('myController', ['$scope', 'contactBook', function($scope, contactBook) {
    $scope.contacts = [];
    $scope.newContact = {};
    $scope.editing = null;

    $scope.init = function() {
        $scope.getAllContacts();
    };

    $scope.getAllContacts = function() {
        contactBook.getAllContacts()
            .then(function(response) {
                $scope.contacts = response.data;
            })
            .catch(function(error) {
                console.log('Error: ', error);
            });
    };

    $scope.editContact = function(contact) {
        $scope.newContact = angular.copy(contact);
        $scope.editing = contact.id;
    };
    
    $scope.addOrEditContact = function() {
        if ($scope.editing !== null) {
            $scope.updateContact();
        } else {
            $scope.addNewContact();
        }
    };

    $scope.addNewContact = function() {
        contactBook.addNewContact($scope.newContact)
            .then(function() {
                $scope.getAllContacts();
                $scope.newContact = {};
            })
            .catch(function(error) {
                console.error('Error adding new contact:', error);
            });
    };

    $scope.updateContact = function() {
        contactBook.updateContact($scope.newContact)
            .then(function() {
                $scope.getAllContacts();
                $scope.newContact = {};
                $scope.editing = null;
            })
            .catch(function(error) {
                console.error('Error updating contact:', error);
            });
    };

    $scope.cancelEdit = function() {
        $scope.newContact = {};
        $scope.editing = null;
    };

    $scope.deleteContact = function(contactId) {
        contactBook.deleteContact(contactId)
            .then(function() {
                $scope.getAllContacts();
            })
            .catch(function(error) {
                console.error('Error deleting contact:', error);
            });
    };

   
}]);
