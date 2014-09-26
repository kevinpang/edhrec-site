var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider
			.when("/",
					{
						templateUrl: "app/partials/main.html"
					})
			.when("/suggestions/tappedout/:id",
					{
						controller: "SuggestionsController",
						templateUrl: "app/partials/suggestions.html"
					})
		  .otherwise({ redirectTo: "/" });
});
