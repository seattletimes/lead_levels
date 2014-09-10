define([
  "application",
  "processData"
], function(app, processed) {

  app.controller("resultController", ["$scope", function($scope) {

    /*
      process data - should probably break out into a new module at some point
    */

    $scope.results = processed;

    $scope.chartBounds = {
      min: 0,
      max: 155
    };

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
    }
  })

});