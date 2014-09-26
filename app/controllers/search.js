app.controller("SearchController", function($scope, $location) {
	$scope.search = function() {
	  var tappedout = $("#tappedout").val();
	  $location.search("tappedout", tappedout);
	}

  if (getParameterByName("tappedout") == null) {
    return;
  }
  
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
});
