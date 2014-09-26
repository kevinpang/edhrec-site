app.controller("SearchController", function($scope, $location) {
  var deckUrl = getParameterByName("deckUrl");
  if (deckUrl) {
    $scope.deckUrl = deckUrl;

  	$scope.creatures = [
  		{ name: "Aetherling" },
  	  { name: "Jin-Gitaxias, Core Augur" },
  	  { name: "Spellskite" }
  	];

  	$scope.nonCreatures = [
  	  { name: "Counterspell" },
  	 	{ name: "Hinder" },
  	  { name: "Forbid" }
  	];

  	$scope.lands = [
  		{ name: "Island" },
  		{ name: "Mutavault" },
  		{ name: "Command Tower"}
  	];

  	$scope.uniques = [
  		{ name: "Cancel" },
  		{ name: "Remand" },
  		{ name: "Spell Crumple"}
  	]
  }
  
  $scope.search = function() {
	  var deckUrl = $("#deckUrl").val();
	  $location.search("deckUrl", deckUrl);
	}
});
