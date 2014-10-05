app.service("eventService", function($window) {
  this.enabled_ = $window.location.hostname.indexOf("edhrec.com") > -1 ||
      $window.location.hostname.indexOf("kevinwilliampang.com") > -1;
  this.window = $window;

  this.incrementSearchSuccessCount = function(type, latency) {
    this.logEvent_("search", "success", type, latency);
  };
  
  this.incrementSearchSampleDeckCount = function() {
    this.logEvent_("search", "success", "sample_deck", 1);
  };
  
  this.incrementSearchErrorCount = function(status) {
    this.logEvent_("search", "error", status, 1); 
  };
  
  this.incrementInvalidDeckUrlCount = function(url) {
    this.logEvent_("search", "invalid_deck_url", url, 1);
  };
  
  this.incrementExceptionCount = function(name, message) {
    this.logEvent_("exception", name, message, 1);
  };
  
  this.logEvent_ = function(category, action, label, value) {
    if (this.enabled_) {
      this.window.ga("send", "event", category, action, label, value);      
    } else {
      this.window.console.log("Skipped recording event. Category: " + category +
          ". Action: " + action + ". Label: " + label + ". Value: " + value);
    }
  }
});
