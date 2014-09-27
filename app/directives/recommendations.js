app.directive("recommendations", function() {
  return {
    restrict: "E",
    scope: {
      type: "@",
      cards: "="
    },
    templateUrl: "app/directives/recommendations.html",
    link: function($scope, element, attributes) {
      element.addClass("span-6 last");
    }
  }
});