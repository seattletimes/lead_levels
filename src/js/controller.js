define([
  "application"
], function(app) {

  app.controller("resultController", ["$scope", function($scope) {

    var results = {};
    var findBounds = function(set) {
      var values = [];
      var employees = {};
      var counts = [0, 0, 0];
      var start = null;
      var end = null
      set.tests.forEach(function(test) {
        //find unique employees, map all values
        employees[test.patient] = true;
        values.push(test.level);
        //convert dates
        var split = test.testedOn.split("/");
        test.date = new Date(split[2], split[0] - 1, split[1]);
        if (!start || start > test.date) {
          start = test.date;
        }
        if (!end || end < test.date) {
          end = test.date;
        }
        //figure counts
        if (test.level > 60) {
          return counts[2]++;
        } else if (test.level > 25) {
          return counts[1]++;
        }
        counts[0]++;
      });
      return {
        min: Math.min.apply(null, values),
        max: Math.max.apply(null, values),
        counts: counts,
        patients: Object.keys(employees).length,
        start: start,
        end: end
      }
    }

    window.bloodTests.forEach(function(row) {
      var id = row.employerID;
      var employer = row.employer;
      if (row.wadesRelated && row.employerID != 1390) {
        id = "1390c";
        employer = "Wade's Contractors";
      }
      if (!results[id]) {
        results[id] = {
          tests: [],
          id: id,
          name: employer
        };
      }
      results[id].tests.push(row);
    });

    Object.keys(results).forEach(function(key) {
      results[key].bounds = findBounds(results[key]);
    });

    $scope.results = results;

    $scope.chartBounds = {
      min: 0,
      max: 170
    };

  }]);

});