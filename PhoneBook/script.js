angular.module('phoneBookApp', [])
.controller('PhoneBookController', ['$scope', function($scope) {
    $scope.contacts = [];
    $scope.editIndex = null;

    function generateId(len) {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var id = '';
        for (var i = 0; i < len; i++) {
            var index = Math.floor(Math.random() * characters.length);
            id += characters[index];
        }
        return id;
    }

    $scope.addContact = function() {
        var id = generateId(8); // Generate an 8-character ID
        $scope.contacts.push({
            id: id,
            name: $scope.newContact.name,
            phoneNumber: $scope.newContact.phoneNumber,
            address: $scope.newContact.address
        });
        $scope.newContact = {}; // Clear the input fields after adding
    };

    $scope.deleteContact = function(index) {
        $scope.contacts.splice(index, 1);
        if ($scope.editIndex === index) {
            $scope.editIndex = null; // Reset editIndex if deleted contact was being edited
        }
    };

    $scope.editContact = function(index) {
        $scope.editing = angular.copy($scope.contacts[index]);
        $scope.editIndex = index;
    };

    $scope.saveContact = function(index) {
        $scope.contacts[index] = $scope.editing;
        $scope.editing = {};
        $scope.editIndex = null;
    };

    $scope.cancelEdit = function() {
        $scope.editing = {};
        $scope.editIndex = null;
    };
}]);
