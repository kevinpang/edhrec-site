app.controller("DeckGeneratorController", function(
    $scope, $location, $timeout, $window, edhrecService) {
  $scope.loading = true;
  
  var commander = $location.search().commander;
  
  edhrecService.generateDeck(commander).then(function(deck) {
    $scope.loading = false;
    $scope.deck = deck;
    
    // Don't run post processing until the next digest cycle so that the
    // sections have had a chance to render.
    $timeout(function() {
      $("#generatedDeck").masonry({
        itemSelector: "card-list"
      });
    }, 1000);
  }, function(errorMessage) {
    $scope.loading = false;
    $scope.error = errorMessage;
  });
});