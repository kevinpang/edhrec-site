var TAPPED_OUT_HOSTNAME = "tappedout.net";
var EDHREC_API_URL = "http://edhrec.com/rec";
var API_REF = "kevin";
var LAND_TYPE = "Land";
var CREATURE_TYPE = "Creature";
var MAX_TOP_RECOMMENDATIONS = 12;
var MAX_RECOMMENDATIONS_PER_CATEGORY = 15;

app.service("recommendationService", function($http, $q) {
  this.getRecommendations = function(deckUrl) {
    var deferred = $q.defer();
    if (!this.isValidDeckUrl_(deckUrl)) {
      deferred.reject("Invalid deck URL.");
      return deferred.promise;
    }
    
    var url = EDHREC_API_URL + "?to=" + deckUrl + "&ref=" + API_REF;
    $http.get(url).then($.proxy(function(result) {    
      deferred.resolve(this.parseResponse_(result.data));
    }, this), function(error) {
      deferred.reject("Error generating recommendations. Status code: " + error.status);
    });
    
    return deferred.promise;
  };
  
  this.isValidDeckUrl_ = function(deckUrl) {
    var parser = document.createElement("a");
    parser.href = deckUrl;
    return parser.hostname === TAPPED_OUT_HOSTNAME;
  };
  
  this.parseResponse_ = function(data) {
    var recs = data.recs.sort(this.cardSortFunction_);
    var cuts = data.cuts; // Deliberately not sorting since most have the same score.    
    var top = [];
    var creatures = [];
    var nonCreatures = [];
    var lands = [];
    
    for (var i = 0; i < recs.length; i++) {
      var card = recs[i];
      var land = this.isLand_(card);
      var creature = this.isCreature_(card);
      
      if (top.length < MAX_TOP_RECOMMENDATIONS && !land) {
        top.push(card);
      } else {
        if (land) {
          lands.push(card);
        } else if (creature) {
          creatures.push(card);
        } else {
          nonCreatures.push(card);
        }
      }
    }
    
    return {
      top: top,
      creatures: creatures.slice(0, MAX_RECOMMENDATIONS_PER_CATEGORY),
      nonCreatures: nonCreatures.slice(0, MAX_RECOMMENDATIONS_PER_CATEGORY),
      lands: lands.slice(0, MAX_RECOMMENDATIONS_PER_CATEGORY),
      cuts: cuts.slice(0, MAX_RECOMMENDATIONS_PER_CATEGORY)
    };
  }
  
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
});