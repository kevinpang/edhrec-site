app.directive("cardAnchor", function() {
  return {
    restrict: "E",
    scope: {
      name: "@"
    },
    templateUrl: "app/templates/cardAnchor.html",
    controller: function($scope, cardService) {
      $scope.getCardUrl = function(name) {
        return cardService.getCardUrl(name);
      };     
    }
  }
});