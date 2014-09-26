var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider
			.when("/",
					{
						controller: "SuggestionsController",
						templateUrl: "app/templates/suggestions.html"
					})
		  .otherwise({ redirectTo: "/" });
});

$(document).ready(function() {
  $("#search").submit(function() {
    var tappedout = $("#tappedout").val();
    
    window.location.href = "#/?tappedout=" + tappedout;
    window.location.reload();
  });
});
