angular.module('phoneBookApp', [])
.controller('PhoneBookController', ['$scope', function($scope) {
    $scope.contacts = [];
    $scope.editIndex = null;
    $scope.editing = null;
    $scope.searchQuery = '';

    function generateId(len) {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var id = '';
        for (var i = 0; i < len; i++) {
            var index = Math.floor(Math.random() * characters.length);
            id += characters[index];
        }
        return id;
    }

    $scope.addOrEditContact = function() {
        if ($scope.editing !== null) {
            $scope.contacts[$scope.editIndex] = $scope.newContact;
            $scope.editing = null;
            $scope.editIndex = null;
        } else {
            var id = generateId(8); // Generate an 8-character ID
            $scope.contacts.push({
                id: id,
                name: $scope.newContact.name,
                phoneNumber: $scope.newContact.phoneNumber,
                address: $scope.newContact.address
            });
        }
        $scope.newContact = {}; // Clear the input fields after adding or editing
    };

    $scope.deleteContact = function(index) {
        $scope.contacts.splice(index, 1);
        if ($scope.editIndex === index) {
            $scope.editIndex = null; // Reset editIndex if deleted contact was being edited
            $scope.editing = null;
        }
    };

    $scope.editContact = function(index) {
        $scope.editIndex = index;
        $scope.editing = angular.copy($scope.contacts[index]);
        $scope.newContact = angular.copy($scope.contacts[index]); // Populate the form with existing values
    };

    $scope.cancelEdit = function() {
        $scope.editIndex = null;
        $scope.editing = null;
        $scope.newContact = {};
    };
}]);
