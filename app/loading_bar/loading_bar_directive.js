app.directive("loadingBar", function() {
  return {
    restrict: "E",
    templateUrl: "app/loading_bar/loading_bar.html",
    scope: {
      text: "@"
    }
  }
});
