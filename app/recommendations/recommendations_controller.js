app.controller("RecommendationsController", function(
    $scope, $location, $timeout, recommendationService) {
  $scope.loading = true;
  var query = $location.search().q;  
  var getRecommendationsPromise = null;
  
  if (query.toLowerCase().indexOf("tappedout") > -1) {
    if (query.indexOf("http") < 0) {
      query = "http://" + query;
    }
    $scope.deckUrl = query;
    getRecommendationsPromise = recommendationService.getDeckRecommendations(query);
  } else {
    $scope.commander = query;
    getRecommendationsPromise = recommendationService.getCommanderRecommendations(query);
  }
  
  getRecommendationsPromise.then($.proxy(function(recommendations) {
    $scope.loading = false;
    $scope.recommendations = recommendations;

    // Don't run post processing until the next digest cycle so that the
    // sections have had a chance to render.
    $timeout(function() {
      var moreRecommendations = $("#moreRecommendations #adds");
      moreRecommendations.masonry({
        itemSelector: "more-recommendations"
      });

      $("#moreRecommendations card-anchor").mouseenter(function() {
        window.console.log("mouseenter");
        var img = $(this).next().find("img");
        img.attr("src", img.attr("lazy-src"));
      });
    }, 1000);
  }, this)).catch(function(errorMessage) {
    $scope.loading = false;
    $scope.error = errorMessage;
  });
});
