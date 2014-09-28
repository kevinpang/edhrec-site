var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
      .when("/",
          {
            templateUrl: "app/templates/home.html"
          })
      .when("/recommendations",
          {
            controller: "RecommendationsController",
            templateUrl: "app/templates/recommendations.html"
          })
      .otherwise({ redirectTo: "/" });
});
