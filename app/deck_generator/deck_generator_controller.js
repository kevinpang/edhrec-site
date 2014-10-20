app.controller("DeckGeneratorController", function($scope, $location, $timeout, recommendationService) {
  $scope.loading = true;
  
  $("#exportDialog").dialog({
    modal: true,
    autoOpen: false,
    title: "Export Decklist",
    height: 400,
    width: 300
  });
  
  var commander = $location.search().commander;
  
  recommendationService.generateDeck(commander).then(function(deck) {
    $scope.loading = false;
    $scope.deck = deck;
    
    // Don't run post processing until the next digest cycle so that the
    // sections have had a chance to render.
    $timeout(function() {
      $("#generatedDeck").masonry({
        itemSelector: "more-recommendations"
      });
    }, 1000);
  }, function(errorMessage) {
    $scope.error = errorMessage;
  });
    
  $scope.openExportDialog = function() {
    for (var i = 0; i < $scope.deck.cardNames.length; i++) {
      $("#exportDialog textarea").append("1x " + $scope.deck.cardNames[i] + "\n");
    }
    resetCursor($("#exportDialog textarea")[0]);
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
});