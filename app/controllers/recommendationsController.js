app.controller("RecommendationsController", function($scope, $location, cardService, recommendationService) {
  var deckUrl = $location.search().deckUrl;
  if (deckUrl) {
    $scope.loading = true;
    recommendationService.getRecommendations(deckUrl)
        .then(function(data) {
          $scope.loading = false;
          $scope.deckUrl = deckUrl;
          $scope.recommendations = data;
        }).catch(function() {
          $scope.loading = false;
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
