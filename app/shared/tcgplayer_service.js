app.service("tcgplayerService", function() {
  var MASS_PRODUCT_ENTRY_URL = "http://store.tcgplayer.com/list/selectproductmagic.aspx";
  
  this.getMassProductEntryUrl = function(cards) {
    var arr = [];
    for (var i = 0; i < cards.length; i++) {
      var exportCard = cards[i];
      arr.push(exportCard.count + " " + exportCard.name);
    }
    return MASS_PRODUCT_ENTRY_URL + "?c=" + arr.join("||");
  };
});
