var TAPPED_OUT_HOSTNAME = "tappedout.net";
var EDHREC_API_URL = "http://edhrec.com/rec";
var API_REF = "kevin";
var LAND_TYPE = "Land";
var CREATURE_TYPE = "Creature";
var MAX_RECOMMENDATIONS_PER_CATEGORY = 10;

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
    
    $http.get(EDHREC_API_URL + "?to=" + deckUrl + "&ref=" + API_REF).then(function(result) {
      var recommendations = {
        top: [],
        creatures: [],
        nonCreatures: [],
        lands: [],
        cuts: result.data.cuts
      };
            
      for (var i = 0; i < result.data.recs.length; i++) {
        var card = result.data.recs[i];
        var land = $.inArray(LAND_TYPE, card.card_info.types) > -1;
        var creature = $.inArray(CREATURE_TYPE, card.card_info.types) > -1;
        
        if (recommendations.top.length < 12 && !land) {
          recommendations.top.push(card);
        } else {
          if (land) {
            recommendations.lands.push(card);
          } else if (creature) {
            recommendations.creatures.push(card);
          } else {
            recommendations.nonCreatures.push(card);
          }
        }
      }
      
      recommendations.creatures = recommendations.creatures.slice(0, MAX_RECOMMENDATIONS_PER_CATEGORY);
      recommendations.nonCreatures = recommendations.nonCreatures.slice(0, MAX_RECOMMENDATIONS_PER_CATEGORY);
      recommendations.lands = recommendations.lands.slice(0, MAX_RECOMMENDATIONS_PER_CATEGORY);
      recommendations.cuts = recommendations.cuts.slice(0, MAX_RECOMMENDATIONS_PER_CATEGORY);
      
      deferred.resolve(recommendations);
    }, function(error) {
      deferred.reject("Error generating recommendations. Status code: " + error.status);
    });
    
    return deferred.promise;
  };
});