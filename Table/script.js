var app = angular.module("myApp", []);

app.controller("myController", ["$log", "$scope", function($log, $scope) {

    $scope.list = [{ id: 1, a: 1, b: "Chaitu", editMode: false, updatedData: "Chaitu" }, 
                   { id: 2, a: 1, b: "Stark", editMode: false, updatedData: "Stark" }];

    // Add item to list function
    $scope.addItem = function() {
        var newObject = {
            id: generateId(4),
            a: $scope.value1,
            b: $scope.value2,
            editMode: false,
            updatedData: $scope.value2
        };
        $scope.list.push(newObject); 
        $scope.value1 = ''; 
        $scope.value2 = ''; 
        $log.log(newObject);
    };

    // Function to generate ID
    function generateId(num) {
        var chars = "fdlkfdlskfds324234443LDNLKFHDFH";
        var id = "";
        for (var i = 0; i < num; i++) { 
            var index = Math.floor(Math.random() * chars.length);
            id += chars[index];
        }
        return id;
    }

    // Function to toggle edit mode
    $scope.toggleEdit = function(item) {
        item.editMode = !item.editMode;
        if (!item.editMode) {
            item.b = item.updatedData;
        }
    };

    // Function to delete item
    $scope.delete = function(item) {
        var index = $scope.list.indexOf(item);
        if (index !== -1) {
            $scope.list.splice(index, 1);
        }
    };

}]);