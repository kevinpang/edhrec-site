app.controller("HomeController", function($scope, $location, config) {
  $scope.sampleCommander = config.SAMPLE_COMMANDER;
  $scope.sampleTappedOutDeckUrl = config.SAMPLE_TAPPED_OUT_DECK_URL;
  $scope.sampleMtgSalvationForumUrl = config.SAMPLE_MTG_SALVATION_FORUM_URL;
});
