var app = angular.module("app", ["ngRoute"]);

app.config(function($provide) {
  $provide.decorator("$exceptionHandler", function($delegate, monitoringService) {
    return function(exception, cause) {
      $delegate(exception, cause);
      monitoringService.incrementExceptionCount(exception.name, exception.message);
    };
  });
});

app.config(function ($routeProvider) {
  $routeProvider
      .when("/", {
        controller: "HomeController",
        templateUrl: "app/home/home.html"
      })
      .when("/recommendations", {
        controller: "RecommendationsController",
        templateUrl: "app/recommendations/recommendations.html"
      })
      .otherwise({ redirectTo: "/" });
});
