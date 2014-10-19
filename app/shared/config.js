angular.module("config", [])
    .constant("config", {
      SAMPLE_COMMANDER: "Rhys the Redeemed",
      SAMPLE_DECK_URL: "http://tappedout.net/mtg-decks/30-09-14-rhys-the-redeemed/",
      environment: function() {
        if (window.location.hostname.indexOf("staging.edhrec.com") > -1) {
          return "STAGING";
        } else if (window.location.hostname.indexOf("edhrec.com") > -1) {
          return "PROD"
        } else {
          return "DEV";
        };
      }
    });