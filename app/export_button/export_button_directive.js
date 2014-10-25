app.directive("exportButton", function() {
  return {
    restrict: "E",
    templateUrl: "app/export_button/export_button.html",
    scope: {
      cards: "="
    },
    controller: function($scope) {
      $("#exportDialog").dialog({
        modal: true,
        autoOpen: false,
        title: "Export",
        height: 400,
        width: 300,
        open: function() {
          resetCursor($("#exportDialog textarea")[0]);
          $("#exportDialog textarea").scrollTop(0);
        }
      });
      
      $scope.openExportDialog = function() {
        $("#exportDialog textarea").text("");

        for (var i = 0; i < $scope.cards.length; i++) {
          var exportCard = $scope.cards[i];
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
    }
  }
});
