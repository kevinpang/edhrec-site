var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider
			.when("/",
					{
						templateUrl: "app/templates/main.html"
					})
			.when("/suggestions/tappedout/:id",
					{
						controller: "SuggestionsController",
						templateUrl: "app/templates/suggestions.html"
					})
		  .otherwise({ redirectTo: "/" });
});
