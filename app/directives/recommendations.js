app.directive("recommendations", function() {
  return {
    restrict: "E",
    scope: {
      title: "@",
      cards: "="
    },
    templateUrl: "app/directives/recommendations.html",
    link: function($scope, element, attributes) {
      element.addClass("span-6 last");
    }
  }
});