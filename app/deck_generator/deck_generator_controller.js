app.controller("DeckGeneratorController", function(
    $scope, $location, $timeout, $window, edhrecService, tcgplayerService) {
  $scope.loading = true;
  
  $("#exportDialog").dialog({
    modal: true,
    autoOpen: false,
    title: "Decklist",
    height: 400,
    width: 300,
    open: function() {
      resetCursor($("#exportDialog textarea")[0]);
      $("#exportDialog textarea").scrollTop(0);
    }
  });
  
  var commander = $location.search().commander;
  
  edhrecService.generateDeck(commander).then(function(deck) {
    $scope.loading = false;
    $scope.deck = deck;
    
    // Don't run post processing until the next digest cycle so that the
    // sections have had a chance to render.
    $timeout(function() {
      $("#generatedDeck").masonry({
        itemSelector: "card-list"
      });
    }, 1000);
  }, function(errorMessage) {
    $scope.loading = false;
    $scope.error = errorMessage;
  });
    
  $scope.openExportDialog = function(deck) {
    $("#exportDialog textarea").text("");
    
    for (var i = 0; i < deck.cards.length; i++) {
      var exportCard = deck.cards[i];
      $("#exportDialog textarea").append(exportCard.count + " " + exportCard.name + "\n");
    }
    
    $("#exportDialog").dialog("open");
  };
  
  var resetCursor = function(txtElement) { 
    if (txtElement.setSelectionRange) { 
      txtElement.focus(); 
      txtElement.setSelectionRange(0, 0); 
    } else if (txtElement.createTextRange) { 
      var range = txtElement.createTextRange();  
      range.moveStart('character', 0); 
      range.select();
    } 
  };
  
  $scope.openMassProductEntry = function(cards) {
    $window.open(tcgplayerService.getMassProductEntryUrl(cards));
  }
});