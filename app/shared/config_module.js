var config = {
  SAMPLE_COMMANDER: "Rhys the Redeemed"
};

if (window.location.hostname.indexOf("staging.edhrec.com") > -1) {
  config.ENVIRONMENT = "STAGING";
} else if (window.location.hostname.indexOf("edhrec.com") > -1) {
  config.ENVIRONMENT = "PROD";
} else {
  config.ENVIRONMENT = "DEV";
}

config.BACKEND_URL = config.ENVIRONMENT == "PROD" ? "http://edhrec.com" : "http://staging.edhrec.com";

angular.module("config", []).constant("config", config);