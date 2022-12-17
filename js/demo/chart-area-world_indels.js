// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Area Chart Example
var ctx = document.getElementById("WorldAreaIndelChart");
var WorldAreaIndelChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67"],
    datasets: [{
      label: "Week",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(200, 102, 0, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(200, 102, 0, 1)",
      pointBorderColor: "rgba(200, 102, 0, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(200, 102, 0, 1)",
      pointHoverBorderColor: "rgba(200, 102, 0, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [0.0817391,0.0723897,0.0517013,0.0607623,0.0570191,0.0549194,0.0575540,0.0591845,0.0571761,0.0637057,0.0544759,0.0535276,0.0704713,0.0646126,0.0679612,0.0733560,0.0544876,0.0814126,0.0787976,0.0598187,0.1185850,0.0675200,0.1489950,0.1139080,0.0834178,0.0860759,0.0985116,0.0989664,0.1218760,0.1069260,0.0995780,0.0956557,0.1140070,0.1063170,0.1249820,0.1372840,0.2054100,0.2106640,0.2310060,0.2151450,0.4373350,0.6598590,0.6105010,0.8158810,0.9013930,1.0515900,1.1338700,1.4134200,1.3329900,1.4966900,1.7091400,1.8416800,1.9354200,2.1073800,2.1987700,2.3049700,2.3515200,2.3700600,2.4665700,2.5139000,2.5635900,2.5822800,2.5631600,2.5610300,2.4605400,2.1974300,2.0771400,1.7142900]
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});
