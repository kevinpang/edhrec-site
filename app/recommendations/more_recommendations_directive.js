app.directive("moreRecommendations", function() {
  return {
    restrict: "E",
    scope: {
      type: "@",
      cards: "="
    },
    templateUrl: "app/recommendations/more_recommendations.html"
  }
});