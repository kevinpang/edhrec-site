var MAX_TOP_MONTH = 10;
var MAX_TOP_ALL_TIME = 10;

app.directive("topCommanders", function() {
  return {
    restrict: "E",
    templateUrl: "app/home/top_commanders.html",
    controller: function($scope, $timeout, topCommandersService) {
      $scope.mode = "topMonth";
      
      topCommandersService.getTopCommanders(MAX_TOP_MONTH, MAX_TOP_ALL_TIME)
          .then(function(topCommanders) {
            $scope.topCommanders = topCommanders;
          });
      
      $scope.setMode = function(mode) {
        $scope.mode = mode;
      }
    }
  }
});