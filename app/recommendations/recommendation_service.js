app.service("recommendationService", function(
    $http, $q, eventService, cardTypes, searchTypes, settings) {
  this.getRecommendations = function(deckUrl) {
    var deferred = $q.defer();
    
    var originalDeckUrl = deckUrl;
    if (deckUrl.indexOf("http") < 0) {
      deckUrl = "http://" + deckUrl;
    }
    
    if (!this.isValidDeckUrl_(deckUrl)) {
      eventService.incrementInvalidDeckUrlCount(originalDeckUrl);
      deferred.reject("Invalid deck link. Please enter in a valid TappedOut link to your deck (e.g. " +
          settings.SAMPLE_DECK_URL + ")");
      return deferred.promise;
    }

    // Hardcoded response for sample deck, both to reduce load on backend and for
    // local testing.  
    var sampleDeck = deckUrl == settings.SAMPLE_DECK_URL;
    var url = sampleDeck ? settings.SAMPLE_RECOMMENDATIONS_URL
        : settings.EDHREC_API_URL + "?to=" + deckUrl + "&ref=" + settings.API_REF;
    var start = (new Date()).getTime();
    
    $http.get(url).then($.proxy(function(result) {
      if (sampleDeck) {
        eventService.incrementSearchSampleDeckCount();
      } else {
        var latency = (new Date()).getTime() - start;
        eventService.incrementSearchSuccessCount(searchTypes.TAPPED_OUT, latency);
      }
      deferred.resolve(this.parseResponse_(result.data));
    }, this), function(error) {
      eventService.incrementSearchErrorCount(error.status);
      var message = "Error generating recommendations.";
      if (error.status == 500) {
        message += " Please verify your deck isn't marked as private and that your deck link is correct.";
      }
      message += " Status code: " + error.status;
      deferred.reject(message);
    });
    
    return deferred.promise;
  };
  
  this.isValidDeckUrl_ = function(deckUrl) {
    var parser = document.createElement("a");
    parser.href = deckUrl;
    for (var i = 0; i < settings.VALID_DECK_URL_HOSTNAMES.length; i++) {
      if (parser.hostname.indexOf(settings.VALID_DECK_URL_HOSTNAMES[i]) > -1) {
        return true;
      }
    }
    return false
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
      var land = this.isType_(card, cardTypes.LAND);
      
      if (recommendations.top.length < settings.MAX_TOP_RECOMMENDATIONS && !land) {
        recommendations.top.push(card);
      } else {      
        if (land) {
          recommendations.lands.push(card);
        } else if (this.isType_(card, cardTypes.CREATURE)) {
          recommendations.creatures.push(card);
        } else if (this.isType_(card, cardTypes.ARTIFACT)) {
          recommendations.artifacts.push(card);
        } else if (this.isType_(card, cardTypes.ENCHANTMENT)) {
          recommendations.enchantments.push(card);
        } else if (this.isType_(card, cardTypes.INSTANT)) {
          recommendations.instants.push(card);
        } else if (this.isType_(card, cardTypes.SORCERY)) {
          recommendations.sorceries.push(card);
        } else if (this.isType_(card, cardTypes.PLANESWALKER)) {
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
