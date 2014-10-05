app.directive("cardImage", function() {
  return {
    restrict: "E",
    scope: {
      name: "@"
    },
    templateUrl: "app/card/card_image.html",
    controller: function($scope, cardService) {
      $scope.getCardImage = function(name) {
        return cardService.getCardImage(name);
      };      
    }
  }
});