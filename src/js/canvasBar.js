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

        var drawCircle = function(level, count) {
          var range = scope.bounds.max - scope.bounds.min;
          var projected = (level - scope.bounds.min) / range * canvas.width;
          if (level >= 60) {
            context.fillStyle = "rgba(220, 30, 0, .6)";
          } else if (level >= 25) {
            context.fillStyle = "rgba(180, 100, 40, .6)";
          } else {
            context.fillStyle = "rgba(130, 80, 0, .6)";
          }
          context.beginPath();
          context.arc(projected, canvas.height / 2, count * 4, 0, Math.PI * 2);
          context.fill();
          context.stroke();
        }

        var render = function() {
          canvas.height = canvas.offsetHeight;
          canvas.width = canvas.offsetWidth;

          var range = scope.bounds.max - scope.bounds.min;
          var levels = scope.data.bounds.byLevel;

          context.strokeStyle = "white";
          context.strokeWidth = 1;

          for (var level in levels) {
            var count = levels[level].length;
            level = level * 1;
            drawCircle(level, count);
          }

        };

        element.on("mousemove click", function(e) {
          render();
          var bounding = canvas.getBoundingClientRect();
          var x = e.clientX - bounding.x;
          var range = scope.bounds.max - scope.bounds.min;
          var unprojected = Math.round(x / canvas.width * range + scope.bounds.min);
          var byLevel = scope.data.bounds.byLevel;
          if (byLevel[unprojected]) {
            drawCircle(unprojected, byLevel[unprojected].length)
          }
        });

        render();

        scope.watch("data", render);
        scope.watch("bounds", render);
        window.addEventListener("resize", render);
      }
    }
  })
})