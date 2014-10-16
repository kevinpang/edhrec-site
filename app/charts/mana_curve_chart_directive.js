app.directive("manaCurveChart", function() {
  return {
    restrict: "E",
    template: "<div></div>",
    scope: {
      curve: "="
    },
    link: function(scope, elem, attrs) {    
      scope.$watch("curve", function(curve) {
        if (!curve) {
          return;
        }
        
        var data = new google.visualization.DataTable();
        data.addColumn("string", "Converted Mana Cost");
        data.addColumn("number", "Count");
        for (var i = 0; i < curve.length; i++) {
          var item = curve[i];
          data.addRow([item[0], item[1]]);
        }

        var options = {
          title: "Mana curve",
          backgroundColor: "#eee",
          legend: { position: "none" },
          fontSize: 12,
          fontName: "'Helvetica Neue', Helvetica, Arial, sans-serif;",
          chartArea: {
            width: "100%",
            height: "80%",
            left: 0
          },
          titleTextStyle: {
            fontSize: 14,
            bold: false
          }
        };

        var manaCurveChart = new google.visualization.ColumnChart(elem[0]);
        manaCurveChart.draw(data, options);
      });
    }
  }
});