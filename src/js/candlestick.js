define([
  "application",
  "text!_candlestick.html",
  "canvasBar"
], function(app, template) {
  
  app.directive("candleStick", function() {
    return {
      restrict:"E",
      template: template,
      transclude: true,
      scope: {
        data: "=",
        bounds: "="
      }
    }
  });

});