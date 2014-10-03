app.service("monitoringService", function() {
  this.incrementSearchSuccessCount = function(type) {
    ga("send", "event", "search", "success", type, 1);
  }
  
  this.incrementSearchSampleDeckCount = function() {
    ga("send", "event", "search", "success", "sample_deck", 1);
  }
  
  this.incrementSearchErrorCount = function(status) {
    ga("send", "event", "search", "error", status, 1);
  }
  
  this.incrementInvalidDeckUrlCount = function(url) {
    ga("send", "event", "search", "error", "invalid_deck_url", 1);
    ga("send", "event", "search", "invalid_deck_url", url, 1);
  }
});
