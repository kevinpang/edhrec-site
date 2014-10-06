app.service("eventService", function($window) {
  this.window = $window;

  this.recordSearchEvent = function(type, responseCode, latency) {
    this.recordEvent_("search", type, responseCode, latency);
  };
  
  this.recordSearchError = function(statusCode, query) {
    this.recordEvent_("search_error", statusCode, query);
  }
    
  this.recordException = function(name, message) {
    this.recordEvent_("exception", name, message, 1);
  };
  
  this.recordEvent_ = function(category, action, label, value) {
    if (this.window.enableAnalytics) {
      this.window.ga("send", "event", category, action, label, value);      
    } else {
      this.window.console.log("Skipped recording event. Category: " + category +
          ". Action: " + action + ". Label: " + label + ". Value: " + value);
    }
  }
});
