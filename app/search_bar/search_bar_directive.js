app.directive("searchBar", function() {
  return {
    restrict: "E",
    templateUrl: "app/search_bar/search_bar.html",
    controller: function($scope, $location, settings) {
      $scope.sampleDeckUrl = settings.SAMPLE_DECK_URL;
      
      $scope.search = function() {
        var query = $("#query").val();
        if (query.trim().length > 0) {
          $location.path("/recommendations").search({ "q": query });
        }
      }
      
      $("#query").focus();
    }
  }
});