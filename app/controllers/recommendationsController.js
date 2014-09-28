app.controller("RecommendationsController", function($scope, $location, cardService, recommendationService) {
  var deckUrl = $location.search().deckUrl;
  if (deckUrl) {
    $scope.deckUrl = deckUrl;
    $scope.recommendations = recommendationService.getRecommendations(deckUrl);
  }

  $scope.getCardUrl = function(name) {
    return cardService.getCardUrl(name);
  };
  
  $scope.getCardImage = function(name) {
    return cardService.getCardImage(name);
  };
});
