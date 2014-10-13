var STATS_API_URL = "http://edhrec.com/stats";

app.service("topCommandersService", function($http, $q) {
  this.getTopCommanders = function(max) {
    return $http.get(STATS_API_URL).then($.proxy(function(result) {
      var topCommanders = {
        topWeek: [],
        topMonth: [],
        topAllTime: []
      };

      for (var i = 0; i < max; i++) {
        if (i < result.data.topweek.length) {
          topCommanders.topWeek.push(this.parseTopCommander_(result.data.topweek[i]));
        }
        if (i < result.data.topmonth.length) {
          topCommanders.topMonth.push(this.parseTopCommander_(result.data.topmonth[i]));
        }
        if (i < result.data.topalltime.length) {
          topCommanders.topAllTime.push(this.parseTopCommander_(result.data.topalltime[i]));
        }
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