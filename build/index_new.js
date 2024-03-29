let minVinput = document.querySelector('#minV');
let maxVinput = document.querySelector('#maxV');
minVinput.value = 205;
maxVinput.value = 253;

function DrawGraph(data1, data2) {
  am5.ready(function () {
    /**
     * ---------------------------------------
     * This demo was created using amCharts 5.
     *
     * For more information visit:
     * https://www.amcharts.com/
     *
     * Documentation is available at:
     * https://www.amcharts.com/docs/v5/
     * ---------------------------------------
     */

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new('chartdiv');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
      }),
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
    cursor.lineX.set('forceHidden', true);
    cursor.lineY.set('forceHidden', true);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: {
          timeUnit: 'second',
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
      }),
    );

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series1 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        valueXField: 'date',
        stroke: am5.color(0x03fc13),
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      }),
    );
    var series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Series2',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        valueXField: 'date',
        stroke: am5.color(0xf403fc),
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      }),
    );

    series1.fills.template.setAll({
      fillOpacity: 0,
      visible: true,
    });
    series2.fills.template.setAll({
      fillOpacity: 0,
      visible: true,
    });

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      }),
    );

    var rangeDate = new Date();
    am5.time.add(rangeDate, 'day', Math.round(series1.dataItems.length / 2));
    var rangeTime = rangeDate.getTime();

    // add series range
    var seriesRangeDataItem = yAxis.makeDataItem({ value: maxVinput.value, endValue: 80 });
    var seriesRangeDataItemLow = yAxis.makeDataItem({ value: minVinput.value, endValue: 0 });
    var series1Range = series1.createAxisRange(seriesRangeDataItem);
    var series1RangeLow = series1.createAxisRange(seriesRangeDataItemLow);
    var series2Range = series2.createAxisRange(seriesRangeDataItem);
    var series2RangeLow = series2.createAxisRange(seriesRangeDataItemLow);

    series1Range.fills.template.setAll({
      visible: true,
      opacity: 1,
    });
    series1RangeLow.fills.template.setAll({
      visible: true,
      opacity: 1,
    });
    series2Range.fills.template.setAll({
      visible: true,
      opacity: 1,
    });
    series2RangeLow.fills.template.setAll({
      visible: true,
      opacity: 1,
    });

    //seriesRange.fills.template.set('fill', am5.color(0xff0000));
    //seriesRange.strokes.template.set('stroke', am5.color(0xff0000));
    //seriesRangeLow.fills.template.set('fill', am5.color(0xff0000));
    //seriesRangeLow.strokes.template.set('stroke', am5.color(0xff0000));

    seriesRangeDataItem.get('grid').setAll({
      strokeOpacity: 1,
      visible: true,
      stroke: am5.color(0xff0000),
      strokeDasharray: [2, 2],
    });

    seriesRangeDataItem.get('label').setAll({
      location: 0,
      visible: true,
      text: 'Max V',
      inside: true,
      centerX: 0,
      centerY: am5.p100,
      fontWeight: 'bold',
    });
    seriesRangeDataItemLow.get('grid').setAll({
      strokeOpacity: 1,
      visible: true,
      stroke: am5.color(0xff0000),
      strokeDasharray: [1, 2],
    });

    seriesRangeDataItemLow.get('label').setAll({
      location: 0.002,
      visible: true,
      text: 'Min V',
      inside: true,
      centerX: 0,
      centerY: am5.p100,
      fontWeight: 'bold',
    });

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);
    series1.data.setAll(data1);
    series2.data.setAll(data2);
  });
}

document.getElementById('inputfile').addEventListener('change', function () {
  let fr = new FileReader();

  fr.onload = function () {
    data1 = [];
    data2 = [];
    linesArray = fr.result.split('\n');
    linesArray.forEach((element) => {
      let correctedLocalDate = `${element.split('|')[0].slice(3, 5)}/${element
        .split('|')[0]
        .slice(0, 2)}${element.split('|')[0].slice(5)}`;
      let localDate = toTimestamp(`${correctedLocalDate} ${element.split('|')[1]}`);
      let value1 = Number(`${element.split('|')[2]}`);
      let value2 = Number(`${element.split('|')[3]}`);
      if (element.length) {
        data1.push({
          date: localDate,
          value: isNaN(value1) || value1,
        });
        data2.push({
          date: localDate,
          value: isNaN(value2) || value2,
        });
      }
    });
    console.log(data1, data2);
    DrawGraph(data1, data2);
  };

  fr.readAsText(this.files[0]);
});
function toTimestamp(strDate) {
  const dt = Date.parse(strDate);
  return dt;
} // end am5.ready()
