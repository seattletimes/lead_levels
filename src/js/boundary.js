define([
  "application"
], function(app) {

  app.directive("boundaryLine", function() {
    return {
      restrict: "E",
      template: "<span class=container><div class=color></div></span>",
      scope: {
        bounds: "=",
        level: "@"
      },
      link: function(scope, element) {
        var color = element.find("div");
        var range = scope.bounds.max - scope.bounds.min;
        var width = scope.level * 1 / range * 100 + "%";

        color.addClass("at-" + scope.level);
        color.css("width", width)
      }
    };
  });

})