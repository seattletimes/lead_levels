define([
  "application",
  "popup",
  "text!_popup.html"
], function(app, popup, pTemplate) {
  
  var easeBounce = function(delta) {
    return 33*Math.pow(delta, 5) + -106*Math.pow(delta, 4) + 126*Math.pow(delta, 3) + -67*Math.pow(delta, 2) + 15*delta;
  };

  var raf = window.requestAnimationFrame || function(f) { setTimeout(f, 16) };

  app.directive("canvasBar", function() {
    return {
      restrict: "E",
      template: "<canvas></canvas>",
      link: function(scope, element, attr) {
        var canvas = element.find("canvas")[0];
        var context = canvas.getContext("2d");

        var drawCircle = function(level, count, special) {
          var radii = [0, 6, 12, 16, 20, 24, 28, 32];
          var range = scope.bounds.max - scope.bounds.min;
          var projected = (level - scope.bounds.min) / range * canvas.width;
          if (special) {
            context.fillStyle = "rgba(80, 80, 200, 0.6)";
          } else if (level >= 60) {
            context.fillStyle = "rgba(107, 1, 3, 0.8)";
          } else if (level >= 25) {
            context.fillStyle = "rgba(194, 26, 1, 0.6)";
          } else {
            context.fillStyle = "rgba(240, 60, 2, 0.6)";
          }
          context.beginPath();
          context.arc(projected, canvas.height / 2, radii[count], 0, Math.PI * 2);
          context.fill();
          context.stroke();
        };

        var render = function() {
          canvas.height = canvas.offsetHeight;
          canvas.width = canvas.offsetWidth;

          var range = scope.bounds.max - scope.bounds.min;

          //draw and label boundary lines
          var boundaries = [

            {value: 10, color: '#DDD'},
            {value: 25, color: '#DDD'},
            {value: 60, color: '#DDD'},
            {value: 100, color: '#DDD'},
            //{value: 10, color: "#F88"},
            //{value: 25, color: "#F66"},
            //{value: 40, color: "#F55"},
            //{value: 60, color: "#F44"},
            //{value: 100, color: "#C11"}
          ];

          // context.save();
          // context.translate(0, canvas.height);
          // context.rotate(-Math.PI / 2);
          boundaries.forEach(function(line, i) {
            var x = (line.value - scope.bounds.min) / range * canvas.width;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
            context.strokeStyle = line.color;
            context.stroke();
            context.fillStyle = "black";
            context.fillText(line.value + (!i ? " mg/dl" : ""), x + 2, canvas.height - 4);
          });
          // context.restore();


          //draw circles
          var levels = scope.data.bounds.byLevel;

          context.strokeStyle = "white";
          context.strokeWidth = 1;

          for (var level in levels) {
            level = level * 1;
            var count = levels[level].length;
            drawCircle(level, count);
          }

        };

        element.on("mousemove click", function(e) {
          render();
          var bounding = canvas.getBoundingClientRect();
          var x = e.clientX - bounding.left;
          var range = scope.bounds.max - scope.bounds.min;
          var level = Math.round(x / canvas.width * range + scope.bounds.min);
          var byLevel = scope.data.bounds.byLevel;
          if (!byLevel[level]) {
            var offset = 1;
            while (!byLevel[level + offset]) {
              if (offset == 3) break;
              if (offset < 0) offset -= 1;
              offset *= -1;
            }
            if (offset !== 3) {
              level += offset;
            }
          }
          if (byLevel[level]) {
            var length = byLevel[level].length;
            drawCircle(level, length, true);
            var content = pTemplate.replace("%level%", level).replace("%count%", length)
            popup.show(content, e.pageX, e.pageY);
          } else {
            popup.hide();
          }
        });

        element.on("mouseleave", function() {
          render();
          popup.hide();
        });

        render();

        scope.$watch("data", render);
        scope.$watch("bounds", render);
        window.addEventListener("resize", render);
      }
    }
  })
})