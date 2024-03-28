
// Define your AngularJS module
var app = angular.module('myApp', []);

// Define the contactBook service
app.service("contactBook", ['$http', function($http) {
    var baseUrl = 'https://6604f29b2ca9478ea17ed412.mockapi.io/api/contacts/contacts';

    // Function to retrieve all contacts
    this.getAllContacts = function() {
        return $http.get(baseUrl);
    };

    // Function to retrieve a contact by id
    this.getContactById = function(id) {
        var url = baseUrl + '/' + id;
        return $http.get(url);
    };

    // Function to add a new contact
    this.addNewContact = function(contact) {
        return $http.post(baseUrl, contact);
    };

    // Function to update an existing contact
    this.updateContact = function(contact) {
        var url = baseUrl + '/' + contact.id;
        return $http.put(url, contact);
    };

    // Function to delete a contact
    this.deleteContact = function(contactId) {
        var url = baseUrl + '/' + contactId;
        return $http.delete(url);
    };
}]);

// Define your main controller
app.controller('MainController', ['$scope', 'contactBook', function($scope, contactBook) {
    // Retrieve all contacts
    contactBook.getAllContacts()
        .then(function(response) {
            $scope.contacts = response.data;
        })
        .catch(function(error) {
            console.error('Error fetching contacts:', error);
        });

    // Example: Add a new contact
    $scope.addContact = function(newContact) {
        contactBook.addNewContact(newContact)
            .then(function(response) {
                // Add the newly created contact to the list
                $scope.contacts.push(response.data);
            })
            .catch(function(error) {
                console.error('Error adding contact:', error);
            });
    };

    // Example: Update an existing contact
    $scope.updateContact = function(contact) {
        contactBook.updateContact(contact)
            .then(function(response) {
                // Handle success if needed
            })
            .catch(function(error) {
                console.error('Error updating contact:', error);
            });
    };

    // Example: Delete a contact
    $scope.deleteContact = function(contactId) {
        contactBook.deleteContact(contactId)
            .then(function() {
                // Remove the deleted contact from the list
                $scope.contacts = $scope.contacts.filter(function(contact) {
                    return contact.id !== contactId;
                });
            })
            .catch(function(error) {
                console.error('Error deleting contact:', error);
            });
    };
}]);



//Custom service tomake API call to crud contacts
//app.service("contactBook", ['$log', '$http', function($log,$http){
  //  var URL = 'https://6604f29b2ca9478ea17ed412.mockapi.io/api/contacts/contacts '
  //  this.addNewContact =   function(info){
   //     return new Promise(function(resolve , reject)){

     //   }
   // }

    //this.deleteContact =   function(info){
      //  return new Promise(function(resolve , reject)){
            
        //}
    //}


//}])



//in service you hav to use this keyword
//in factory we have to return an object
//in provider you have to use these below snippetes to return any typw of value


//this.$get=['$log', function($log){

//}]