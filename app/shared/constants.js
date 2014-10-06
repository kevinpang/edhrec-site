app.constant("settings", {
  VALID_DECK_URL_HOSTNAMES: [
    "tappedout.net"
  ],
  EDHREC_API_URL: "http://edhrec.com/rec",
  API_REF: "kevin",
  MAX_TOP_RECOMMENDATIONS: 12,
  MAX_RECOMMENDATIONS_PER_TYPE: 15,
  SAMPLE_RECOMMENDATIONS_URL: "public/sample_recommendations.txt",
  SAMPLE_DECK_URL: "http://tappedout.net/mtg-decks/30-09-14-rhys-the-redeemed/"
});

app.constant("cardTypes", {
  CREATURE: "Creature",
  LAND: "Land",
  ARTIFACT: "Artifact",
  ENCHANTMENT: "Enchantment",
  INSTANT: "Instant",
  SORCERY: "Sorcery",
  PLANESWALKER: "Planeswalker"
});

app.constant("searchTypes", {
  TAPPED_OUT: "tapped_out",
  SAMPLE_DECK: "sample_deck"
})