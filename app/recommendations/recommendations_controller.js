app.controller("RecommendationsController", function(
    $scope, $location, $timeout, recommendationService) {
  $scope.loading = true;
  var query = $location.search().q;  
  
  if (query.toLowerCase().indexOf("tappedout") > -1) {
    if (query.indexOf("http") < 0) {
      query = "http://" + query;
    }
    
    recommendationService.getDeckRecommendations(query)
        .then($.proxy(function(recommendations) {
          $scope.loading = false;
          $scope.deckUrl = query;
          $scope.recommendations = recommendations;
          this.updateMoreRecommendationsUi_();
        }, this)).catch(function(errorMessage) {
          $scope.loading = false;
          $scope.error = errorMessage;
        });
  } else {
    recommendationService.getCommanderRecommendations(query)
        .then($.proxy(function(recommendations) {
          $scope.loading = false;
          $scope.commander = query;
          $scope.recommendations = recommendations;
          this.updateMoreRecommendationsUi_();
        }, this)).catch(function(errorMessage) {
          $scope.loading = false;
          $scope.error = errorMessage;
        });
  }
  
  // Optimizes "More recommendations" layout and sets up hover handlers.
  this.updateMoreRecommendationsUi_ = function() {
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
  }
});
