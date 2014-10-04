app.directive("cardImage", function() {
  return {
    restrict: "E",
    scope: {
      name: "@"
    },
    templateUrl: "app/card_image/card_image.html",
    controller: function($scope, cardService) {
      $scope.getCardImage = function(name) {
        return cardService.getCardImage(name);
      };      
    }
  }
});