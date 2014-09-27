app.controller("RecommendationsController", function($scope, $location, cardService, recommendationService) {
  var deckUrl = $location.search().deckUrl;
  if (deckUrl) {
    $scope.recommendations = recommendationService.getRecommendations(deckUrl);
    $("#query").val(deckUrl);
  }

	$scope.getCardUrl = function(name) {
    return cardService.getCardUrl(name);
	};
	
	$scope.getCardImage = function(name) {
    return cardService.getCardImage(name);
	};
});
