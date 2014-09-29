app.directive("cardAnchor", function() {
  return {
    restrict: "E",
    scope: {
      name: "@",
      showText: "@"
    },
    templateUrl: "app/directives/cardAnchor.html",
    controller: function($scope, cardService) {
      $scope.getCardUrl = function(name) {
        return cardService.getCardUrl(name);
      };     
    }
  }
});