var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider
			.when("/",
					{
						controller: "SearchController",
						templateUrl: "app/templates/search.html"
					})
		  .otherwise({ redirectTo: "/" });
});
