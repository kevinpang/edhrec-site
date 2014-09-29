app.directive("moreRecommendations", function() {
  return {
    restrict: "E",
    scope: {
      type: "@",
      cards: "="
    },
    templateUrl: "app/templates/moreRecommendations.html"
  }
});