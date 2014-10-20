app.directive("colorChart", function($timeout) {
  return {
    restrict: "E",
    template: "Card costs<div></div>",
    scope: {
      colors: "="
    },
    link: function(scope, elem, attrs) {    
      scope.$watch("colors", function(colors) {
        if (!colors) {
          return;
        }
        
        var data = new google.visualization.DataTable();
        data.addColumn("string", "Color");
        data.addColumn("number", "Count");
        for (var key in colors) {
          if (colors.hasOwnProperty(key)) {
            data.addRow([key, colors[key]]);        
          }
        }

        var options = {
          backgroundColor: "#eee",
          chartArea: {
            width: "90%",
            height: "90%"
          },
          titleTextStyle: {
            fontSize: 14,
            bold: false
          },
          fontSize: 12,
          fontName: "'Helvetica Neue', Helvetica, Arial, sans-serif;",
          slices: {
            0: { color: 'blue' },
            1: { color: 'black' },
            2: {
              color: 'white',
              textStyle: {color: 'black'}
            },
            3: { color: 'green' },
            4: { color: 'red' }}
        };

        $timeout(function() {
          var chart = new google.visualization.PieChart(elem.children("div")[0]);
          chart.draw(data, options);          
        }, 1000);
      });
    }
  }
});