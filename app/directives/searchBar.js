app.directive("searchBar", function() {
  return {
    restrict: "E",
    scope: {
      name: "@"
    },
    templateUrl: "app/directives/searchBar.html",
    controller: function($scope, $location) {
      $scope.search = function() {
    	  var query = $("#query").val();
    	  $location.path("/recommendations").search({ "deckUrl": query });
    	}
    	
    	$("#query").focus();
    }
  }
});