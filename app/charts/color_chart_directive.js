app.directive("colorChart", function() {
  return {
    restrict: "E",
    template: "<div></div>",
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
          title: "Card costs",
          backgroundColor: "#eee",
          chartArea: {
            width: "90%",
            height: "85%",
            left: 0
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

        var chart = new google.visualization.PieChart(elem[0]);
        chart.draw(data, options);
      });
    }
  }
});