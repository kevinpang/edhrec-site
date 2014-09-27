app.controller("SearchController", function($scope, $location) {
  var deckUrl = getParameterByName("deckUrl");
  if (deckUrl) {
    $scope.deckUrl = deckUrl;
    $scope.topTen = [];
    $scope.creatures = [];
    $scope.nonCreatures = [];
    $scope.lands = [];
    $scope.uniques = [];
    
    for (var i = 0; i < 10; i++) {
      $scope.topTen.push({ name: getRandomCardName(CREATURES) });
      $scope.creatures.push({ name: getRandomCardName(CREATURES) });
      $scope.nonCreatures.push({ name: getRandomCardName(NON_CREATURES) });
      $scope.lands.push({ name: getRandomCardName(LANDS) });
      $scope.uniques.push({ name: getRandomCardName(UNIQUES) });
    }
  }
  
  $scope.search = function() {
	  var query = $("#query").val();
	  $location.search("deckUrl", query);
	}
	
	$scope.getCardUrl = function(name) {
	  return "http://gatherer.wizards.com/Pages/Card/Details.aspx?name=" + name;
	};
	
	$scope.getCardImage = function(name) {
	  return "http://gatherer.wizards.com/Handlers/Image.ashx?name=" + name + "&type=card&.jpg";
	};
});
