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

var getParameterByName = function(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.href);
  return results == null || results[1] == "" ?
      null : decodeURIComponent(results[1].replace(/\+/g, " "));
}
