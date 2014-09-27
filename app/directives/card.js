app.directive("card", function() {
  return {
    restrict: "E",
    scope: {
      name: "@"
    },
    templateUrl: "app/directives/card.html",
    controller: function($scope, cardService) {
      $scope.getCardUrl = function(name) {
        return cardService.getCardUrl(name);
    	};

    	$scope.getCardImage = function(name) {
        return cardService.getCardImage(name);
    	};      
    }
  }
});