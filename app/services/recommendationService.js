var TAPPED_OUT_HOSTNAME = "tappedout.net";

app.service("recommendationService", function($http, $q) {
  this.isValidDeckUrl = function(deckUrl) {
    var parser = document.createElement("a");
    parser.href = deckUrl;
    return parser.hostname === TAPPED_OUT_HOSTNAME;
  };
  
  this.getRecommendations = function(deckUrl) {
    var deferred = $q.defer();

    if (!this.isValidDeckUrl(deckUrl)) {
      deferred.reject("Invalid deck URL.");
      return deferred.promise;
    }
    
    $http.get("http://edhrec.com/rec?to=" + deckUrl + "&ref=kevin").then(function(result) {
      var recommendations = {
        topTen: result.data.recs,
        creatures: [],
        nonCreatures: [],
        lands: [],
        cuts: result.data.cuts
      };

      deferred.resolve(recommendations);
    }, function(error) {
      deferred.reject("Error generating recommendations: " + error.status + " - " + error.statusText + ".");
    });
    
    return deferred.promise;
  };
});