app.controller("SuggestionsController", function($scope) {
	$scope.creatures = [
		{ name: "Aetherling" },
	  { name: "Jin-Gitaxias" },
	  { name: "Core Augur" }
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
