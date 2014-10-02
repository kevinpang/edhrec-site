app.service("monitoringService", function() {
  this.incrementSearchSuccessCount = function() {
    ga("send", "event", "search", "success", null, 1);
  }
  
  this.incrementSearchErrorCount = function(status) {
    ga("send", "event", "search", "error", status, 1);
  }
});
