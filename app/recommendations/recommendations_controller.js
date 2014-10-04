app.controller("RecommendationsController", function(
    $scope, $location, $timeout, cardService, recommendationService, pageViewService) {
  var deckUrl = $location.search().q;
  $scope.loading = true;
  
  recommendationService.getRecommendations(deckUrl)
      .then(function(recommendations) {
        $scope.loading = false;
        $scope.deckUrl = deckUrl;
        $scope.recommendations = recommendations;

        // Don't run Masonry until the next digest cycle so that the
        // sections have had a chance to render.
        $timeout(function() {
          var moreRecommendations = $("#moreRecommendations #adds");
          moreRecommendations.masonry({
            itemSelector: "more-recommendations"
          });  
        }, 1000);
      }).catch(function(errorMessage) {
        $scope.loading = false;
        $scope.error = errorMessage;
      });

  $scope.getCardUrl = function(name) {
    return cardService.getCardUrl(name);
  };
  
  $scope.getCardImage = function(name) {
    return cardService.getCardImage(name);
  };
});
