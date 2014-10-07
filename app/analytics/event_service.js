app.service("eventService", function($window) {
  this.recordSearchEvent = function(query, type, status, latency) {
    this.recordEvent_("search", type, status, latency);
    if (status != "200") {
      this.recordEvent_("search_error", status, query);
    }
  };
      
  this.recordException = function(name, message) {
    this.recordEvent_("exception", name, message, 1);
  };
  
  this.recordEvent_ = function(category, action, label, value) {
    if ($window.enableAnalytics) {
      $window.ga("send", "event", category, action, label, value);      
    } else {
      $window.console.log("Skipped recording event. Category: " + category +
          ". Action: " + action + ". Label: " + label + ". Value: " + value);
    }
  }
});
