app.service("edhrecService", function($http, $q, eventService, config) {
  var MAX_TOP_RECS = 12;
  var MAX_CUTS = 15;
  var SAMPLE_DECK_RECOMMENDATIONS_URL = "public/sample_deck_recommendations.txt";
  var API_REF = "kevin";
  var TAPPED_OUT_RECOMMENDATIONS_URL = config.BACKEND_URL + "/rec";
  var COMMANDER_RECOMMENDATIONS_URL = config.BACKEND_URL + "/cmdr";
  var GENERATE_DECK_URL = config.BACKEND_URL + "/cmdrdeck";
  var RANDOM_COMMANDER_URL = config.BACKEND_URL + "/randomcmdr";

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
  
  this.getDeckRecommendations = function(deckUrl) {
    // Hardcoded response for sample deck to reduce load on backend
    var sampleDeck = deckUrl == config.SAMPLE_DECK_URL;
    var searchType = sampleDeck ? searchTypes.SAMPLE_DECK : searchTypes.TAPPED_OUT;
    var url = sampleDeck ? SAMPLE_DECK_RECOMMENDATIONS_URL
        : TAPPED_OUT_RECOMMENDATIONS_URL + "?to=" + deckUrl + "&ref=" + API_REF;
        
    return this.getRecommendations_(deckUrl, searchType, url)
        .then($.proxy(function(recommendations) {
          return recommendations;
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
    var sampleCommander = commander == config.SAMPLE_COMMANDER;
    var searchType = sampleCommander ? searchTypes.SAMPLE_COMMANDER : searchTypes.COMMANDER;
    var url = COMMANDER_RECOMMENDATIONS_URL + "?commander=" + commander;
        
    return this.getRecommendations_(commander, searchType, url)
        .then($.proxy(function(recommendations) {
          return recommendations;
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
      return this.parseRecommendationsResponse_(result.data);
    }, this), function(error) {
      var latency = (new Date()).getTime() - start;
      eventService.recordSearchEvent(query, searchType, error.status, latency);
      return $q.reject(error);
    });
  }
  
  this.parseRecommendationsResponse_ = function(data) {
    var recommendations = this.createCollection_();
    
    recommendations.commander = data.commander; // Only returned on commander searches
    recommendations.top = [];
    if (data.cuts) {
      recommendations.cuts = data.cuts.slice(0, MAX_CUTS);
    } else {
      recommendations.cuts = [];
    }

    // API returns cstats in the stats field on commander searches
    recommendations.stats = data.commander ? null : data.stats;
    recommendations.kstats = data.kstats; // Only returned on deck searches
    recommendations.cstats = data.commander ? data.stats : data.cstats;

    for (var i = 0; i < data.recs.length; i++) {
      var card = data.recs[i];
      var land = this.isType_(card, cardTypes.LAND);
      
      if (recommendations.top.length < MAX_TOP_RECS && !land) {
        recommendations.top.push(card);
      } else {
        this.addCard_(card, recommendations);
      }
    }
    
    return recommendations;
  }
  
  this.generateDeck = function(commander) {
    var url = GENERATE_DECK_URL + "?commander=" + commander;
    var start = (new Date()).getTime();
    
    return $http.get(url).then($.proxy(function(result) {
      var latency = (new Date()).getTime() - start;
      eventService.recordGenerateDeckEvent(result.status, latency);
      return this.parseGenerateDeckResponse_(result.data);
    }, this), function(error) {
      var latency = (new Date()).getTime() - start;
      eventService.recordGenerateDeckEvent(commander, error.status, latency);
      return $q.reject("Error generating deck. Status code: " + error.status);
    });
  };
  
  this.parseGenerateDeckResponse_ = function(data) {
    var deck = this.createCollection_();
    deck.commander = data.commander;
    deck.stats = data.stats;
    deck.basics = data.basics;
    
    deck.cardNames = [];
    for (var i = 0; i < data.cards.length; i++) {
      var card = data.cards[i];
      deck.cardNames.push(card.card_info.name);
      this.addCard_(card, deck);
    }
    
    for (var i = 0; i < deck.basics.length; i++) {
      deck.lands.push({
        card_info: {
          name: deck.basics[i][0]
        }
      });
    }

    deck.cardNames.sort();
    return deck;
  };
  
  this.createCollection_ = function() {
    return {
      creatures: [],
      artifacts: [],
      enchantments: [],
      instants: [],
      sorceries: [],
      planeswalkers: [],
      lands: []
    };
  }
  
  this.addCard_ = function(card, collection) {
    if (this.isType_(card, cardTypes.LAND)) {
      collection.lands.push(card);
    } else if (this.isType_(card, cardTypes.CREATURE)) {
      collection.creatures.push(card);
    } else if (this.isType_(card, cardTypes.ARTIFACT)) {
      collection.artifacts.push(card);
    } else if (this.isType_(card, cardTypes.ENCHANTMENT)) {
      collection.enchantments.push(card);
    } else if (this.isType_(card, cardTypes.INSTANT)) {
      collection.instants.push(card);
    } else if (this.isType_(card, cardTypes.SORCERY)) {
      collection.sorceries.push(card);
    } else if (this.isType_(card, cardTypes.PLANESWALKER)) {
      collection.planeswalkers.push(card);
    }
  };
  
  this.isType_ = function(card, type) {
    if (card == null || card.card_info == null) {
      return false;
    }
    return $.inArray(type, card.card_info.types) > -1;
  };
  
  this.getRandomCommander = function() {
    return $http.get(RANDOM_COMMANDER_URL).then(function(result) {
      return result.data.commander;
    }, function(error) {
      return $q.reject("Error getting random commander. Status code: " + error.status);
    });
  };
});
