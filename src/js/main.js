require([
  "application",
  "controller",
  "candlestick",
  "boundary"
], function(app) {

  angular.bootstrap(document.body, [app.name])

});