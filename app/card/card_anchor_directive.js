app.directive("cardAnchor", function() {
  return {
    restrict: "E",
    scope: {
      name: "@",
      url: "@"
    },
    templateUrl: "app/card/card_anchor.html",
    controller: function($scope, cardService) {
      $scope.getCardUrl = function(name) {
        return cardService.getCardUrl(name);
      };     
    }
  }
});