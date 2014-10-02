app.controller("HomeController", function($scope, $location, $window, settings) {
  $scope.sampleDeckUrl = settings.SAMPLE_DECK_URL;
  
  $scope.search = function(deckUrl) {
    $("#query").val(deckUrl);
    $location.path("/recommendations").search({ "q": deckUrl });
  }
  
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.path() });
  });
});
