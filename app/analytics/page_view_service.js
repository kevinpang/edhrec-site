app.service("pageViewService", function($rootScope, $location, $window) {
  $rootScope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.path() });
  });
});
