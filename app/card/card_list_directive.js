app.directive("cardList", function() {
  return {
    restrict: "E",
    scope: {
      type: "@",
      cards: "="
    },
    templateUrl: "app/card/card_list.html"
  }
});