app.controller("HomeController", function($scope, $location, config) {
  $scope.sampleCommander = config.SAMPLE_COMMANDER;
  $scope.sampleDeckUrl = config.SAMPLE_DECK_URL;
});
