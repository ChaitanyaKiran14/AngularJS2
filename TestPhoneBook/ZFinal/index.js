var app = angular.module('myApp', [])

app.service('contactBook', ['$http', function($http){

    var baseUrl = 'https://6604f29b2ca9478ea17ed412.mockapi.io/api/contacts/contacts'

    this.getAllContacts = function(){
        return $http.get(baseUrl)
    }

    this.createContact = function(contact){
        return $http.post(baseUrl ,contact)
    }

    this.updateContact = function(contact){
        var url = baseUrl + '/' + contact.id
        return $http.put(url, contact)
    }


    this.deleteContact = function(contact){
        return $http.delete(baseUrl + "/" + contact.id)
    }


}])


app.controller('myController', ['$scope', 'contactBook', function($scope, contactBook){

    $scope.contacts = []
    $scope.newContact = {}
    $scope.editing = null

    $scope.init = function(){
        $scope.getAllContacts()
        
    }


    $scope.getAllContacts = function(){
        contactBook.getAllContacts()
        .then(function(response){
            console.log(response.data)
            $scope.contacts = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    }

    $scope.butClick = function(){
        alert('OK chaitu')
    }



}])