app.directive("cardImage", function() {
  return {
    restrict: "E",
    scope: {
      name: "@"
    },
    templateUrl: "app/templates/cardImage.html",
    controller: function($scope, cardService) {
      $scope.getCardImage = function(name) {
        return cardService.getCardImage(name);
      };      
    }
  }
});