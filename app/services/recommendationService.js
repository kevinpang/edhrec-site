app.service("recommendationService", function($http, $q, monitoringService, types, settings) {
  this.getRecommendations = function(deckUrl) {
    var deferred = $q.defer();
    if (!this.isValidDeckUrl_(deckUrl)) {
      monitoringService.incrementInvalidDeckUrlCount();
      deferred.reject("Invalid deck URL.");
      return deferred.promise;
    }

    // Hardcoded response for sample deck, both to reduce load on backend and for
    // local testing.  
    var sampleDeck = deckUrl == settings.SAMPLE_DECK_URL;
    var url = sampleDeck ? settings.SAMPLE_RECOMMENDATIONS_URL
        : settings.EDHREC_API_URL + "?to=" + deckUrl + "&ref=" + settings.API_REF;
    
    $http.get(url).then($.proxy(function(result) {
      if (sampleDeck) {
        monitoringService.incrementSearchSampleDeckCount();
      } else {
        monitoringService.incrementSearchSuccessCount();
      }
      deferred.resolve(this.parseResponse_(result.data));
    }, this), function(error) {
      monitoringService.incrementSearchErrorCount(error.status);
      var message = "Error generating recommendations. Status code: " + error.status;
      if (error.status == 500) {
        message += ". Please verify your deck link is correct and that your deck isn't marked as private.";
      }
      deferred.reject(message);
    });
    
    return deferred.promise;
  };
  
  this.isValidDeckUrl_ = function(deckUrl) {
    var parser = document.createElement("a");
    parser.href = deckUrl;
    return parser.hostname === settings.TAPPED_OUT_HOSTNAME;
  };
  
  this.parseResponse_ = function(data) {
    var recommendations = {
      top: [],
      creatures: [],
      artifacts: [],
      enchantments: [],
      instants: [],
      sorceries: [],
      planeswalkers: [],
      lands: [],
      cuts: data.cuts
    }

    for (var i = 0; i < data.recs.length; i++) {
      var card = data.recs[i];
      var land = this.isType_(card, types.LAND);
      
      if (recommendations.top.length < settings.MAX_TOP_RECOMMENDATIONS && !land) {
        recommendations.top.push(card);
      } else {      
        if (land) {
          recommendations.lands.push(card);
        } else if (this.isType_(card, types.CREATURE)) {
          recommendations.creatures.push(card);
        } else if (this.isType_(card, types.ARTIFACT)) {
          recommendations.artifacts.push(card);
        } else if (this.isType_(card, types.ENCHANTMENT)) {
          recommendations.enchantments.push(card);
        } else if (this.isType_(card, types.INSTANT)) {
          recommendations.instants.push(card);
        } else if (this.isType_(card, types.SORCERY)) {
          recommendations.sorceries.push(card);
        } else if (this.isType_(card, types.PLANESWALKER)) {
          recommendations.planeswalkers.push(card);
        }
      }
    }
    
    recommendations.creatures = recommendations.creatures.slice(0, settings.MAX_RECOMMENDATIONS_PER_TYPE);
    recommendations.artifacts = recommendations.artifacts.slice(0, settings.MAX_RECOMMENDATIONS_PER_TYPE);
    recommendations.enchantments = recommendations.enchantments.slice(0, settings.MAX_RECOMMENDATIONS_PER_TYPE);
    recommendations.instants = recommendations.instants.slice(0, settings.MAX_RECOMMENDATIONS_PER_TYPE);
    recommendations.sorceries = recommendations.sorceries.slice(0, settings.MAX_RECOMMENDATIONS_PER_TYPE);
    recommendations.planeswalkers = recommendations.planeswalkers.slice(0, settings.MAX_RECOMMENDATIONS_PER_TYPE);
    recommendations.lands = recommendations.lands.slice(0, settings.MAX_RECOMMENDATIONS_PER_TYPE);
    recommendations.cuts = recommendations.cuts.slice(0, settings.MAX_RECOMMENDATIONS_PER_TYPE);
    return recommendations;
  }
  
  this.isType_ = function(card, type) {
    return $.inArray(type, card.card_info.types) > -1;
  }
});
