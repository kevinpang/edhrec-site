app.directive("moreRecommendations", function() {
  return {
    restrict: "E",
    scope: {
      type: "@",
      cards: "="
    },
    templateUrl: "app/directives/moreRecommendations.html",
    link: function($scope, element, attributes) {
      element.addClass("span-6 last");
    }
  }
});