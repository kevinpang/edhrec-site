var TAPPED_OUT_HOSTNAME = "tappedout.net";
var EDHREC_API_URL = "http://edhrec.com/rec";
var API_REF = "kevin";
var LAND_TYPE = "Land";
var CREATURE_TYPE = "Creature";
var MAX_RECOMMENDATIONS_PER_CATEGORY = 15;

app.service("recommendationService", function($http, $q) {
  this.isValidDeckUrl_ = function(deckUrl) {
    var parser = document.createElement("a");
    parser.href = deckUrl;
    return parser.hostname === TAPPED_OUT_HOSTNAME;
  };
  
  // Sorts cards by score in descending order.
  this.cardSortFunction_ = function(card1, card2) {
    return card2.score - card1.score;
  }
  
  this.isLand_ = function(card) {
    return $.inArray(LAND_TYPE, card.card_info.types) > -1;
  }
  
  this.isCreature_ = function(card) {
    return $.inArray(CREATURE_TYPE, card.card_info.types) > -1;
  }
  
  this.getRecommendations = function(deckUrl) {
    var deferred = $q.defer();

    if (!this.isValidDeckUrl_(deckUrl)) {
      deferred.reject("Invalid deck URL.");
      return deferred.promise;
    }
    
    var url = EDHREC_API_URL + "?to=" + deckUrl + "&ref=" + API_REF;
    $http.get(url).then($.proxy(function(result) {
      var recs = result.data.recs.sort(this.cardSortFunction_);
      
      var recommendations = {
        top: [],
        creatures: [],
        nonCreatures: [],
        lands: [],
        // Deliberately not sorting cuts since a lot of them end up with the same score.
        cuts: result.data.cuts
      };
            
      for (var i = 0; i < recs.length; i++) {
        var card = recs[i];
        var land = this.isLand_(card);
        var creature = this.isCreature_(card);
        
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
    }, this), function(error) {
      deferred.reject("Error generating recommendations. Status code: " + error.status);
    });
    
    return deferred.promise;
  };
});