var app = angular.module('phoneBookApp', []);

app.service("contactBook", ['$http', function($http) {
    var baseUrl = 'https://6604f29b2ca9478ea17ed412.mockapi.io/api/contacts/contacts';

    this.getAllContacts = function() {
        return $http.get(baseUrl);
    };

    this.getContactById = function(id) {
        var url = baseUrl + '/' + id;
        return $http.get(url);
    };

    this.addNewContact = function(contact) {
        return $http.post(baseUrl, contact);
    };

    this.updateContact = function(contact) {
        var url = baseUrl + '/' + contact.id;
        return $http.put(url, contact);
    };

    this.deleteContact = function(contactId) {
        var url = baseUrl + '/' + contactId;
        return $http.delete(url);
    };
}]);

app.controller('MainController', ['$scope', 'contactBook', function($scope, contactBook) {
    var mainCtrl = this;

    mainCtrl.init = function() {
        mainCtrl.getAllContacts();
    };

    mainCtrl.getAllContacts = function() {
        contactBook.getAllContacts()
            .then(function(response) {
                mainCtrl.contacts = response.data;
            })
            .catch(function(error) {
                console.error('Error fetching contacts:', error);
            });
    };

    mainCtrl.editContact = function(contact) {
        mainCtrl.editingContact = angular.copy(contact);
        mainCtrl.showEditForm = true;
    };

    mainCtrl.updateContact = function() {
        contactBook.updateContact(mainCtrl.editingContact)
            .then(function(response) {
                mainCtrl.getAllContacts();
                mainCtrl.showEditForm = false;
            })
            .catch(function(error) {
                console.error('Error updating contact:', error);
            });
    };

    mainCtrl.cancelEdit = function() {
        mainCtrl.showEditForm = false;
    };

    mainCtrl.deleteContact = function(contactId) {
        contactBook.deleteContact(contactId)
            .then(function() {
                mainCtrl.getAllContacts();
            })
            .catch(function(error) {
                console.error('Error deleting contact:', error);
            });
    };
}]);
