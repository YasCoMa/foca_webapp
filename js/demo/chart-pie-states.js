// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("StatePieChart");
var StatePieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"],
    datasets: [{
      data: [28,160,556,93,385,86,31,70,911,173,341,93,23,194,246,214,19,295,2635,194,34,37,989,281,170,8474,27],
      backgroundColor: ["#FF0000","#FF3900","#FF7100","#FFAA00","#FFE300","#E3FF00","#AAFF00","#71FF00","#39FF00","#00FF00","#00FF39","#00FF71","#00FFAA","#00FFE3","#00E3FF","#00AAFF","#0071FF","#0039FF","#0000FF","#3900FF","#7100FF","#AA00FF","#E300FF","#FF00E3","#FF00AA","#FF0071","#FF0039"],
      hoverBackgroundColor: ['#E8C32E', '#A0D600', '#EDB48E'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: true,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 0,
  },
});
