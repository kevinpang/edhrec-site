app.service("monitoringService", function() {
  this.incrementSearchSuccessCount = function() {
    ga("send", "event", "search", "success", null, 1);
  }
  
  this.incrementSearchErrorCount = function(status) {
    ga("send", "event", "search", "error", status, 1);
  }
  
  this.incrementInvalidDeckUrlCount = function() {
    ga("send", "event", "search", "error", "invalid_deck_url", 1);
  }
});
