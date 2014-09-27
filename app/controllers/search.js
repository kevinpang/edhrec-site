app.controller("SearchController", function($scope, $location, cardService) {
  var deckUrl = getParameterByName("deckUrl");
  if (deckUrl) {
    $scope.deckUrl = deckUrl;
    $scope.topTen = [];
    $scope.creatures = [];
    $scope.nonCreatures = [];
    $scope.lands = [];
    $scope.cuts = [];
    
    for (var i = 0; i < 10; i++) {
      $scope.topTen.push({ name: getRandomCardName(CREATURES) });
      $scope.creatures.push({ name: getRandomCardName(CREATURES) });
      $scope.nonCreatures.push({ name: getRandomCardName(NON_CREATURES) });
      $scope.lands.push({ name: getRandomCardName(LANDS) });
      $scope.cuts.push({ name: getRandomCardName(CUTS) });
    }
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
