define([
  "application",
  "processData"
], function(app, processed) {

  app.controller("resultController", ["$scope", function($scope) {

    /*
      process data - should probably break out into a new module at some point
    */

    var all = processed;

    var shortened = processed.filter(function(resultSet) {
      return resultSet.id == 1390 || resultSet.id == "1390c";
    });
    $scope.results = shortened;
    $scope.truncated = true;

    $scope.showToggle = function() {
      $scope.results = $scope.truncated ? all : shortened;
      $scope.truncated = !$scope.truncated;
    };

    $scope.chartBounds = {
      min: 8,
      max: 155
    };

    $scope.notInspected = ["1154", "1351", "1375"];
    $scope.inactive = ["1375", "1351", "1349"];

  }]);

  app.directive("log", function() {
    return {
      restrict: "A",
      scope: {
        statement: "="
      },
      link: function(scope, element, attr) {
        console.log(attr);
      }
    };
  });

});