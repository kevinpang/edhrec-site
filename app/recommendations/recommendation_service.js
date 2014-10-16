var MAX_TOP_RECS = 12;
var MAX_CUTS = 15;
var SAMPLE_DECK_RECOMMENDATIONS_URL = "public/sample_deck_recommendations.txt";
var TAPPED_OUT_RECOMMENDATIONS_URL = "http://edhrec.com/rec";
var COMMANDER_RECOMMENDATIONS_URL = "http://edhrec.com/cmdr";
var API_REF = "kevin";

var searchTypes = {
  COMMANDER: "commander",
  SAMPLE_COMMANDER: "sample_commander",
  SAMPLE_DECK: "sample_deck",
  TAPPED_OUT: "tapped_out"
};

var cardTypes = {
  CREATURE: "Creature",
  LAND: "Land",
  ARTIFACT: "Artifact",
  ENCHANTMENT: "Enchantment",
  INSTANT: "Instant",
  SORCERY: "Sorcery",
  PLANESWALKER: "Planeswalker"
};

app.service("recommendationService", function($http, $q, eventService, settings) {    
  this.getDeckRecommendations = function(deckUrl) {
    // Hardcoded response for sample deck to reduce load on backend
    var sampleDeck = deckUrl == settings.SAMPLE_DECK_URL;
    var searchType = sampleDeck ? searchTypes.SAMPLE_DECK : searchTypes.TAPPED_OUT;
    var url = sampleDeck ? SAMPLE_DECK_RECOMMENDATIONS_URL
        : TAPPED_OUT_RECOMMENDATIONS_URL + "?to=" + deckUrl + "&ref=" + API_REF;
        
    return this.getRecommendations_(deckUrl, searchType, url)
        .then($.proxy(function(data) {
          return this.parseResponse_(data);
        }, this), function(error) {
          var message = "Error generating recommendations.";
          if (error.status == 500) {
            message += " Please verify your deck isn't marked as private, " +
                "your deck link looks like http://tappedout.net/mtg-decks/your-deck-name, " +
                "and that the commander field is filled in on your deck.";
          }
          message += " Status code: " + error.status;
          return $q.reject(message);
        });
  };

  this.getCommanderRecommendations = function(commander) {
    var sampleCommander = commander == settings.SAMPLE_COMMANDER;
    var searchType = sampleCommander ? searchTypes.SAMPLE_COMMANDER : searchTypes.COMMANDER;
    var url = COMMANDER_RECOMMENDATIONS_URL + "?commander=" + commander;
        
    return this.getRecommendations_(commander, searchType, url)
        .then($.proxy(function(data) {
          return this.parseResponse_(data);
        }, this), function(error) {
          return $q.reject("Error generating recommendations. Please verify you typed " +
              "in a valid commander or deck link. Status code: " + error.status);
        });
  };
  
  this.getRecommendations_ = function(query, searchType, url) {
    var start = (new Date()).getTime();
    
    return $http.get(url).then($.proxy(function(result) {
      var latency = (new Date()).getTime() - start;
      eventService.recordSearchEvent(query, searchType, result.status, latency);
      return result.data;
    }, this), function(error) {
      var latency = (new Date()).getTime() - start;
      eventService.recordSearchEvent(query, searchType, error.status, latency);
      return $q.reject(error);
    });
  }
  
  this.parseResponse_ = function(data) {
    var recommendations = {
      commander: data.commander, // Only returned on commander searches
      top: [],
      creatures: [],
      artifacts: [],
      enchantments: [],
      instants: [],
      sorceries: [],
      planeswalkers: [],
      lands: [],
      cuts: data.cuts || [],
      // API returns cstats in the stats field on commander searches
      stats: data.commander ? null : data.stats,
      kstats: data.kstats, // Only returned on deck searches
      cstats: data.commander ? data.stats : data.cstats
    }

    for (var i = 0; i < data.recs.length; i++) {
      var card = data.recs[i];
      var land = this.isType_(card, cardTypes.LAND);
      
      if (recommendations.top.length < MAX_TOP_RECS && !land) {
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
    
    recommendations.cuts = recommendations.cuts.slice(0, MAX_CUTS);
    return recommendations;
  }
  
  this.isType_ = function(card, type) {
    if (card == null || card.card_info == null) {
      return false;
    }
    return $.inArray(type, card.card_info.types) > -1;
  }
});
