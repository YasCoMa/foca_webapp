//Bar plot about the number of unique mutations by ORFs

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';



//Get the data Mutations by ORFs
var moarr = [];
var lmoarr = [];

$.ajax ({
  dataType: "json",
  async: false,
  url: serverfoca + '/get_mutations_orf',
  success: function(data) {
    var obj = JSON.parse(data);
    for (var i in obj){
      moarr.push(obj[i].Num);
      lmoarr.push(obj[i].ORFs);
    }
  }
});




// Pie Chart Example
var ctx = document.getElementById("BarChartVariantsBR").getContext('2d');
var myPieChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: lmoarr,
    datasets: [{
      data: moarr,
      backgroundColor: ["#00A600","#2DB600","#63C600","#A0D600","#E6E600","#E8C32E","#EBB25E","#EDB48E","#F0C9C0","#F2F2F2","#FFC9CC","#F0C9CF"],
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

