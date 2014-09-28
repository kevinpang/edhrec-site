app.controller("RecommendationsController", function($scope, $location, cardService, recommendationService) {
  var deckUrl = $location.search().deckUrl;
  if (deckUrl) {
    recommendationService.getRecommendations(deckUrl)
        .then(function(data) {
          $scope.deckUrl = deckUrl;
          $scope.recommendations = data;
        }).catch(function() {
          $scope.error = "An error occurred while generating recommendations. Please try again";
        });
  }

  $scope.getCardUrl = function(name) {
    return cardService.getCardUrl(name);
  };
  
  $scope.getCardImage = function(name) {
    return cardService.getCardImage(name);
  };
});
