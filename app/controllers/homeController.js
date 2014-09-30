app.controller("HomeController", function($scope, $location) {
  $scope.search = function(deckUrl) {
    $("#query").val(deckUrl);
    $location.path("/recommendations").search({ "q": deckUrl });
  }
});
