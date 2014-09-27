app.directive("card", function() {
  return {
    restrict: "E",
    scope: {
      name: "@",
    },
    templateUrl: "app/directives/card.html"
  }
});