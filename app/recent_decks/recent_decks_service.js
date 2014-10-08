var API_URL = "http://edhrec.com/recent";

app.service("recentDecksService", function($http, $q) {
  this.getRecentDecks = function(max) {
    return $http.get(API_URL).then(function(result) {
      var recentDecks = [];
      
      for (var i = 0; i < max; i++) {
        if (i >= result.data.length) {
          break;
        }        
        recentDecks.push(JSON.parse(result.data[i]));
      }
      
      return recentDecks;
    }, function(error) {
      return $q.reject(error);
    });
  }
});