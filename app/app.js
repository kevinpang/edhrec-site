var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider
			.when("/", {})
			.when("/suggestions",
					{
						controller: "SuggestionsController",
						templateUrl: "app/templates/suggestions.html"
					})
		  .otherwise({ redirectTo: "/" });
});

$(document).ready(function() {
  $("#search").submit(function() {
    var tappedout = $("#tappedout").val();
    var reload = window.location.href.indexOf("suggestions") > 0;
    
    window.location.href = "#/suggestions?tappedout=" + tappedout;
    if (reload) {
      window.location.reload();      
    }
  });
});
