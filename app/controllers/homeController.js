app.controller("HomeController", function($scope, $location) {
  $scope.search = function(deckUrl) {
    $location.path("/recommendations").search({ "deckUrl": deckUrl });
  }
});
