// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["B.1", "B.1.1.28", "B.1.1.318", "B.1.1.7", "B.1.617.2", "P.1", "P.1.1", "P.1.2", "P.2", "P.4"],
    datasets: [{
      data: [1, 2, 4, 84, 3, 2833, 52, 77, 3, 39],
      backgroundColor: ["#00A600","#2DB600","#63C600","#A0D600","#E6E600","#E8C32E","#EBB25E","#EDB48E","#F0C9C0","#F2F2F2"],
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
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
