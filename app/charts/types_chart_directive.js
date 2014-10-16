app.directive("typesChart", function() {
  return {
    restrict: "E",
    template: "<div></div>",
    scope: {
      types: "="
    },
    link: function(scope, elem, attrs) {    
      scope.$watch("types", function(types) {
        if (!types) {
          return;
        }
        
        var data = new google.visualization.DataTable();
        data.addColumn("string", "Card type");
        data.addColumn("number", "Count");
        for (var key in types) {
          if (types.hasOwnProperty(key)) {
            data.addRow([key, types[key]]);
          }
        }

        var options = {
          title: "Card types",
          backgroundColor: "#eee",
          chartArea: {
            width: "100%",
            height: "90%"
          },
        }

        var chart = new google.visualization.PieChart(elem[0]);
        chart.draw(data, options);
      });
    }
  }
});