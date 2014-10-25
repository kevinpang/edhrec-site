app.controller("RandomController", function($location, edhrecService) {
  edhrecService.getRandomCommander().then(function(commander) {
    $location.path("/recommendations").search({ "q": commander });
  });
});
