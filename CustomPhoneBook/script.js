var app = angular.module('phoneBookApp', []);

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

app.controller('MainController', ['$scope', 'contactBook', function ($scope, contactBook) {
    var mainCtrl = this;
    mainCtrl.contacts = [];
    mainCtrl.newContact = {};
    mainCtrl.editing = null;

    mainCtrl.init = function () {
        mainCtrl.getAllContacts();
    };

    mainCtrl.getAllContacts = function () {
        contactBook.getAllContacts()
            .then(function (response) {
                mainCtrl.contacts = response.data;
            })
            .catch(function (error) {
                console.error('Error fetching contacts:', error);
            });
    };

    mainCtrl.addOrEditContact = function () {
        if (mainCtrl.editing !== null) {
            mainCtrl.updateContact();
        } else {
            mainCtrl.addNewContact();
        }
    };

    mainCtrl.addNewContact = function () {
        contactBook.addNewContact(mainCtrl.newContact)
            .then(function () {
                mainCtrl.getAllContacts();
                mainCtrl.newContact = {};
            })
            .catch(function (error) {
                console.error('Error adding new contact:', error);
            });
    };

    mainCtrl.updateContact = function () {
        contactBook.updateContact(mainCtrl.newContact)
            .then(function () {
                mainCtrl.getAllContacts();
                mainCtrl.newContact = {};
                mainCtrl.editing = null;
            })
            .catch(function (error) {
                console.error('Error updating contact:', error);
            });
    };

    mainCtrl.cancelEdit = function () {
        mainCtrl.newContact = {};
        mainCtrl.editing = null;
    };

    mainCtrl.editContact = function (contact) {
        mainCtrl.newContact = angular.copy(contact);
        mainCtrl.editing = contact.id;
    };

    mainCtrl.deleteContact = function (contactId) {
        contactBook.deleteContact(contactId)
            .then(function () {
                mainCtrl.getAllContacts();
            })
            .catch(function (error) {
                console.error('Error deleting contact:', error);
            });
    };
}]);
