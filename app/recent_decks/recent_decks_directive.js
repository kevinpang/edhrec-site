app.directive("recentDecks", function() {
  return {
    restrict: "E",
    templateUrl: "app/recent_decks/recent_decks.html",
    controller: function($scope, $timeout, recentDecksService) {
      recentDecksService.getRecentDecks(20).then(function(recentDecks) {
        $scope.recentDecks = recentDecks;
        
        // Don't run post processing until the next digest cycle so that the
        // sections have had a chance to render.
        $timeout(function() {
          $("#recent_decks card-anchor").mouseenter(function() {
            var img = $(this).next().find("img");
            img.attr("src", img.attr("lazy-src"));
          });
        }, 1000);
      }, function() {
        // Do nothing.
      });
    }
  }
});