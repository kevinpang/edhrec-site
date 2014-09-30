app.controller("RecommendationsController", function($scope, $location, cardService, recommendationService) {
  var deckUrl = $location.search().q;
  $scope.loading = true;
  
  recommendationService.getRecommendations(deckUrl)
      .then(function(recommendations) {
        $scope.loading = false;
        $scope.deckUrl = deckUrl;
        $scope.recommendations = recommendations;
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
