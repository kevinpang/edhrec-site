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
            width: "100%",
            height: "90%"
          },
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