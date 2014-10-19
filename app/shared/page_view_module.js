angular.module('pageView', ["config"])
    .run(function($rootScope, $window, $location, config) {
      $rootScope.$on('$viewContentLoaded', function() {
        if (config.ENVIRONMENT == "PROD") {
          $window.ga('send', 'pageview', { page: $location.path() });
        } else {
          $window.console.log("Skipped recording pageview. Location: " + $location.path());        
        }
      });
    });