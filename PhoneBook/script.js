angular.module('phoneBookApp', [])
.controller('PhoneBookController', ['$scope', function($scope) {
    $scope.contacts = [];
    $scope.editIndex = null;

    $scope.addContact = function() {
        $scope.contacts.push({
            name: $scope.newContact.name,
            phoneNumber: $scope.newContact.phoneNumber,
            address: $scope.newContact.address
        });
        $scope.newContact = {};
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
