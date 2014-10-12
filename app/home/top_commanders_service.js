var STATS_API_URL = "http://edhrec.com/stats";

app.service("topCommandersService", function($http, $q) {
  this.getTopCommanders = function(maxTopMonth, maxTopAllTime) {
    return $http.get(STATS_API_URL).then($.proxy(function(result) {
      var topCommanders = {
        topMonth: [],
        topAllTime: []
      };

      for (var i = 0; i < maxTopMonth; i++) {
        if (i >= result.data.topmonth.length) {
          break;
        }
        topCommanders.topMonth.push(this.parseTopCommander_(result.data.topmonth[i]));
      }
      
      for (var i = 0; i < maxTopAllTime; i++) {
        if (i >= result.data.topalltime.length) {
          break;
        }
        topCommanders.topAllTime.push(this.parseTopCommander_(result.data.topalltime[i]));
      }
      
      return topCommanders;
    }, this), function(error) {
      return $q.reject(error);
    });
  };
  
  this.parseTopCommander_ = function(topCommander) {
    return {
      name: topCommander[0],
      count: topCommander[1]
    }
  };
});