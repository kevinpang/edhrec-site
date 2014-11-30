app.directive("topCommanders", function() {
  return {
    restrict: "E",
    templateUrl: "app/top_commanders/top_commanders.html",
    controller: function($scope, $timeout, topCommandersService) {
      var MAX_TOP_COMMANDERS = 10;
      
      $scope.mode = "topWeek";
      
      topCommandersService.getTopCommanders(MAX_TOP_COMMANDERS)
          .then(function(topCommanders) {
            $scope.topCommanders = topCommanders;
          });
      
      $scope.setMode = function(mode) {
        $scope.mode = mode;
      }
      
      $scope.getTopCommanders = function() {
        if (!$scope.topCommanders) {
          return null;
        }
        
        switch($scope.mode) {
          case "topMonth":
            return $scope.topCommanders.topMonth;
          case "topAllTime":
            return $scope.topCommanders.topAllTime;
          default:
            return $scope.topCommanders.topWeek;
        }
      }
    }
  }
});