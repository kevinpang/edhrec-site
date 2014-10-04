app.directive("analytics", function() {
  return {
    restrict: "E",
    controller: function($scope, $location, $window) {
      $scope.$on('$viewContentLoaded', function(event) {
        $window.ga('send', 'pageview', { page: $location.path() });
      });
    }
  }
});