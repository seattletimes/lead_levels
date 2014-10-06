require([
  "pym",
  "application",
  "controller",
  "candlestick",
  "boundary"
], function(pym, app) {

  var child = pym.Child({
    polling: 500
  });

  //hack hack hack
  child.id = "lead-levels";

  angular.bootstrap(document.body, [app.name]);

});