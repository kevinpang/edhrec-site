app.directive("recentDecks", function() {
  return {
    restrict: "E",
    templateUrl: "app/recent_decks/recent_decks.html",
    controller: function($scope, recentDecksService) {
      recentDecksService.getRecentDecks(20).then(function(recentDecks) {
        $scope.recentDecks = recentDecks;
      }, function() {
        // Do nothing.
      });
    }
  }
});