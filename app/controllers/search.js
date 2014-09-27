app.controller("SearchController", function($scope, $location, cardService, recommendationService) {
  var getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(window.location.href);
    return results == null || results[1] == "" ?
        null : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  var deckUrl = getParameterByName("deckUrl");
  if (deckUrl) {
    $scope.deckUrl = deckUrl;
    $scope.recommendations = recommendationService.getRecommendations(deckUrl);
  }
  
  $scope.search = function() {
	  var query = $("#query").val();
	  $location.search("deckUrl", query);
	}
	
	$scope.getCardUrl = function(name) {
    return cardService.getCardUrl(name);
	};
	
	$scope.getCardImage = function(name) {
    return cardService.getCardImage(name);
	};
});
