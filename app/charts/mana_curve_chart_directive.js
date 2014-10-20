app.directive("manaCurveChart", function($timeout) {
  return {
    restrict: "E",
    template: "Mana curve<div></div>",
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
          backgroundColor: "#eee",
          legend: { position: "none" },
          fontSize: 12,
          fontName: "'Helvetica Neue', Helvetica, Arial, sans-serif;",
          chartArea: {
            width: "100%",
            height: "90%"
          },
          titleTextStyle: {
            fontSize: 14,
            bold: false
          }
        };

        $timeout(function() {
          var chart = new google.visualization.ColumnChart(elem.children("div")[0]);
          chart.draw(data, options);
        }, 1000);
      });
    }
  }
});