define([
  "application",
  "text!_candlestick.html"
], function(app, template) {
  
  app.directive("candleStick", function() {
    return {
      restrict:"E",
      template: template,
      transclude: true,
      scope: {
        data: "=",
        bounds: "="
      },
      link: function(scope, element, attrs) {
        scope.$watch("data", function() {

          var data = scope.data;

          if (!data || !scope.bounds) return;

          var bounds = data.bounds;
          var range = scope.bounds.max - scope.bounds.min;

          //generate transformed data for scope
          scope.transformed = {
            left: (bounds.min - scope.bounds.min) / range,
            width: (bounds.max - bounds.min) / range,
            tests: []
          }

          if (data.tests) {
            var subrange = bounds.max - bounds.min;
            data.tests.forEach(function(test) {
              scope.transformed.tests.push({
                left: (test.level - bounds.min) / subrange,
                test: test
              });
            });
          }

        });

        scope.enteredSlice = function(test) {
          console.log(test.level, test.testedOn);
        }
      }
    }
  });

});