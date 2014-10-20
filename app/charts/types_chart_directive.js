app.directive("typesChart", function($timeout) {
  return {
    restrict: "E",
    template: "Card types<div></div>",
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
          backgroundColor: "#eee",
          fontSize: 12,
          fontName: "'Helvetica Neue', Helvetica, Arial, sans-serif;",
          chartArea: {
            width: "90%",
            height: "90%"
          },
          titleTextStyle: {
            fontSize: 14,
            bold: false
          }
        }

        $timeout(function() {
          var chart = new google.visualization.PieChart(elem.children("div")[0]);
          chart.draw(data, options);
        }, 1000);
      });
    }
  }
});