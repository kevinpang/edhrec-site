var app = angular.module("app", ["ngRoute", "pageView", "config"]);

app.config(function($provide) {
  $provide.decorator("$exceptionHandler", function($delegate, analyticsService) {
    return function(exception, cause) {
      $delegate(exception, cause);
      analyticsService.recordException(exception.name, exception.message);
    };
  });
});

app.config(function($routeProvider) {
  $routeProvider
      .when("/", {
        controller: "HomeController",
        templateUrl: "app/home/home.html"
      })
      .when("/recommendations", {
        controller: "RecommendationsController",
        templateUrl: "app/recommendations/recommendations.html"
      })
      .when("/deckGenerator", {
        controller: "DeckGeneratorController",
        templateUrl: "app/deck_generator/deck_generator.html"
      })
      .when("/random", {
        controller: "RandomController",
        templateUrl: "app/random/random.html"
      })
      .otherwise({ redirectTo: "/" });
});

app.config(function($compileProvider, config) {
  if (config.ENVIRONMENT == "PROD") {
    $compileProvider.debugInfoEnabled(false);
  } else {
    window.console.log("debugInfoEnabled");
  }
});
