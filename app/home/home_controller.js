app.controller("HomeController", function($scope, $location, settings) {
  $scope.sampleCommander = settings.SAMPLE_COMMANDER;
  $scope.sampleDeckUrl = settings.SAMPLE_DECK_URL;
  
  $scope.search = function(deckUrl) {
    $("#query").val(deckUrl);
    $location.path("/recommendations").search({ "q": deckUrl });
  }
});
