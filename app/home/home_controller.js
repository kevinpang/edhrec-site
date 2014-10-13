app.controller("HomeController", function($scope, $location, settings) {
  $scope.sampleCommander = settings.SAMPLE_COMMANDER;
  $scope.sampleDeckUrl = settings.SAMPLE_DECK_URL;
});
