var config = {
  SAMPLE_COMMANDER: "Rhys the Redeemed",
  SAMPLE_TAPPED_OUT_DECK_URL: "http://tappedout.net/mtg-decks/30-09-14-rhys-the-redeemed/",
  SAMPLE_MTG_SALVATION_FORUM_URL: "http://mtgsalvation.com/forums/the-game/commander-edh/multiplayer-commander-decklists/527628-horde-of-notions-5c-goodstuff"
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