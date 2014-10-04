app.directive("searchBar", function() {
  return {
    restrict: "E",
    scope: {
      name: "@"
    },
    templateUrl: "app/search_bar/search_bar.html",
    controller: function($scope, $location, settings) {
      $scope.sampleDeckUrl = settings.SAMPLE_DECK_URL;
      
      $scope.search = function() {
        var query = $("#query").val();
        $location.path("/recommendations").search({ "q": query });
      }
      
      $("#query").focus();
    }
  }
});