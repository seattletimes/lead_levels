define([
  "application"
], function(app) {

  app.controller("resultController", ["$scope", function($scope) {

    $scope.results = window.bloodTests;

    $scope.chartBounds = {
      min: 0,
      max: 170
    };

  }]);

});