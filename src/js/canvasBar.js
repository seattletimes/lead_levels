define([
  "application"
], function(app) {
  app.directive("canvasBar", function() {
    return {
      restrict: "E",
      template: "<canvas></canvas>",
      link: function(scope, element, attr) {
        var canvas = element.find("canvas")[0];
        var context = canvas.getContext("2d");

        var render = function() {
          canvas.height = canvas.offsetHeight;
          canvas.width = canvas.offsetWidth;

          var range = scope.bounds.max - scope.bounds.min;
          var bounds = scope.data.bounds;

          //build the rectangle array
          var rectangles = [];
          if (bounds.min < 25) {
            rectangles.push({
              left: bounds.min,
              right: bounds.max > 25 ? 25 : right,
              fill: "rgba(167, 100, 34, 1)",
              count: bounds.counts[0]
            });
          }
          if (bounds.min < 60 && bounds.max > 25) {
            rectangles.push({
              left: bounds.min < 25 ? 25 : bounds.min,
              right: bounds.max > 60 ? 60 : bounds.max,
              fill: "rgba(222, 129, 25, 1)",
              count: bounds.counts[1]
            });
          }
          if (bounds.max > 60) {
            rectangles.push({
              left: bounds.min < 60 ? 60 : bounds.min,
              right: bounds.max,
              fill: "rgba(230, 80, 30, 1)",
              count: bounds.counts[2]
            });
          }

          //render bar rects
          rectangles.forEach(function(rect, i) {
            var left = (rect.left - scope.bounds.min) / range * canvas.width;
            var right = (rect.right - scope.bounds.min) / range * canvas.width - left;
            context.fillStyle = rect.fill;
            context.fillRect(left, 0, right, canvas.height);
          });

        }

        render();

        scope.watch("data", render);
        scope.watch("bounds", render);
      }
    }
  })
})