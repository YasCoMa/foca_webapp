
function generate_colors(size){
    var colors=[];
    while (colors.length<size){
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        randomColor="#"+randomColor;
        if( !colors.includes(randomColor) && randomColor!="#ffffff" ){
            colors=colors.concat(randomColor);
        }
    }
    
    return colors;
}

var server = "http://"+window.location.host+":5000";

var foca = (function () {
    
  // Keep this variable private inside this closure scope
  var proteins = [];
  var locations = [];
  var mutations = [];
  var lineages_count=[];
  // Expose these functions via an interface while hiding
  // the implementation of the module within the function() block

  return {
    
    init: function() {
      foca.fills_last_update();
      foca.fills_proteins();
      foca.fills_locations();
      
    },

    fills_proteins: async function () {
        document.getElementById("sec1_last_update").innerHTML="getting data";
        $.ajax({
          method: "GET",
          url: server+"/get_proteins"
        })
          .done(function( msg ) {
            var output = JSON.parse(msg)
            foca.proteins = output.msg
            var proteins_select_html = ""
            for (var i=0; i<foca.proteins.length; i++){
                proteins_select_html += "<option value='"+foca.proteins[i]+"' > "+foca.proteins[i]+"</option>"
            }
            document.getElementById("sec2_proteins").innerHTML = proteins_select_html;
            document.getElementById("sec4_proteins").innerHTML = proteins_select_html;
            document.getElementById("sec6_proteins").innerHTML = proteins_select_html;
            
            $(document).ready(function(){
        		$('#sec2_proteins').selectpicker();
        		$('#sec4_proteins').selectpicker();
        		$('#sec6_proteins').selectpicker();
        	});
        	
          });
    },
    
    fills_locations: async function () {
        document.getElementById("sec1_last_update").innerHTML="getting data";
        $.ajax({
          method: "GET",
          url: server+"/get_locations"
        })
          .done(function( msg ) {
            var output = JSON.parse(msg)
            foca.locations = output.msg
            var locations_select_html = "<option value='All'>All</option>"
            for (var i=0; i<foca.locations.length; i++){
                locations_select_html += "<option value='"+foca.locations[i]+"' > "+foca.locations[i]+"</option>"
            }
            document.getElementById("sec2_locations").innerHTML = locations_select_html;
            document.getElementById("sec4_locations").innerHTML = locations_select_html;
            document.getElementById("sec6_locations").innerHTML = locations_select_html;
            
            $(document).ready(function(){
        		$('#sec2_locations').selectpicker();
        		$('#sec4_locations').selectpicker();
        		$('#sec6_locations').selectpicker();
        	});
            
          });
    },
    
    // section 1
    fills_last_update: async function () {
        document.getElementById("sec1_last_update").innerHTML="getting data";
        $.ajax({
          method: "GET",
          url: server+"/last_update"
        })
          .done(function( msg ) {
            var output = JSON.parse(msg)
            document.getElementById("sec1_last_update").innerHTML=output.msg;
          });
    },
    
    // section 2
    get_missense_by_period: async function (period) {
        var proteins = $('#sec2_proteins').val();
        var location = document.getElementById("sec2_locations").value;
        var period = document.getElementById("sec2_period").value;
        
        if(proteins.length==0){
            bootbox.alert("Choose at least one protein to execute the query!");
        }
        else{
            proteins = proteins.join(',');
            $('#sec2_action').html('wait...');
            document.getElementById("sec2_action").disabled=true;
            
            $.ajax({
              method: "GET",
              url: server+"/mutations_mean_by_period/"+location+"/"+period+"/"+proteins+"/missense"
            })
            .done(function( msg ) {
                  $('#sec2_action').html('GO');
                 document.getElementById("sec2_action").disabled=false;
                  
                $('#sec2_mutations').remove();
                $('#sec2_chart_container').append('<canvas id="sec2_mutations"></canvas>');
                
                var response = JSON.parse(msg)
                var data = {
                    labels: response.labels,
                    datasets: response.datasets
                  };
                var ctx = document.getElementById("sec2_mutations");
                 
                 var chart = new Chart(ctx, {
                  type: 'line',
                  data: data,
                  options: {
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      tooltip: { 
                          enabled: true,
                          callbacks: {
                           /*label: function(tooltipItem) {
                              var dataset = data['datasets'][tooltipItem.datasetIndex];
                              return dataset['label'];
                            },*/
                            afterLabel: function(tooltipItem) {
                              var dataset = data['datasets'][tooltipItem.datasetIndex];
                              var stdev = " - SD: " + dataset['deviation'][tooltipItem.dataIndex].toFixed(2) ;
                              return stdev;
                            }
                          }
                      }
                    }
                  }
                });
                
            });
        }
    },
    
    // section 3
    change_lineages_by_count: function() {
        $('#sec3_lineages_by_count').remove();
        $('#sec3_chart_container').append('<canvas id="sec3_lineages_by_count"></canvas>');
        var mut=document.getElementById("sec3_options").value;
        var response = foca.lineages_count[mut];
        console.log(response)
            var ctx = document.getElementById("sec3_lineages_by_count");
              var chart = new Chart(ctx, {
              type: 'pie',
              data: {
                labels: response.labels,
                datasets: [{
                  label: '# occurrences',
                  data: response.counts,
                  backgroundColor: generate_colors(response.counts.length)
                }]
              },
                  options: {
                      responsive:true
                  }
            });
    },
    
    get_lineages_by_count: async function() {
        // install cairo library: sudo apt-get install libcairo2-dev libjpeg-dev libgif-dev
        
        var muts=document.getElementById("sec3_mutations").value;
        var hits=document.getElementById("sec3_hits").value;
        if(hits==""){
            hits=1;
        }
        
        if(muts==""){
            $("#sec3_options").hide();
            bootbox.alert("Put some mutation to execute the query!");
        }
        else{
            $('#sec3_action').html('wait...');
            document.getElementById("sec3_action").disabled=true;
            
            var mut_list=muts.split(",");
            foca.mutations=mut_list;
            
            $.ajax({
              method: "GET",
              url: server+"/lineages_count_by_mutation/"+muts+"/"+hits
            })
              .done(function( msg ) {
                  $('#sec3_action').html('GO');
                  document.getElementById("sec3_action").disabled=false;
                  
                  var items="";
                  for (i=0; i<mut_list.length; i++){
                      items+="<option value='"+mut_list[i]+"' > "+mut_list[i]+"</option>"
                  }
                  document.getElementById("sec3_options").innerHTML=items;
                  $("#sec3_options").show();
                
                var output = JSON.parse(msg)
                document.getElementById('file_export_sec3').href = server+""+output["file_export"];
                foca.lineages_count=output
                
                 $('#sec3_lineages_by_count').remove();
                $('#sec3_chart_container').append('<canvas id="sec3_lineages_by_count"></canvas>');
        
                var response=output[mut_list[0]]
                var ctx = document.getElementById("sec3_lineages_by_count");
                  var chart = new Chart(ctx, {
                  type: 'pie',
                  data: {
                    labels: response.labels,
                    datasets: [{
                      label: '# occurrences',
                      data: response.counts,
                      backgroundColor: generate_colors(response.counts.length)
                    }]
                  },
                  options: {
                      responsive:true
                  }
                });
              });
              
        }
    },
    
    // section 4
    get_indel_by_period: async function (period) {
        var proteins = $('#sec4_proteins').val();
        var location = document.getElementById("sec4_locations").value;
        var period = document.getElementById("sec4_period").value;
        
        if(proteins.length==0){
            bootbox.alert("Choose at least one protein to execute the query!");
        }
        else{
            proteins = proteins.join(',');
            $('#sec4_action').html('wait...');
            document.getElementById("sec4_action").disabled=true;
            
            $.ajax({
              method: "GET",
              url: server+"/mutations_mean_by_period/"+location+"/"+period+"/"+proteins+"/indel"
            })
            .done(function( msg ) {
                  $('#sec4_action').html('GO');
                 document.getElementById("sec4_action").disabled=false;
                  
                $('#sec4_mutations').remove();
                $('#sec4_chart_container').append('<canvas id="sec4_mutations"></canvas>');
                
                var response = JSON.parse(msg)
                var data = {
                    labels: response.labels,
                    datasets: response.datasets
                  };
                var ctx = document.getElementById("sec4_mutations");
                 
                 var chart = new Chart(ctx, {
                  type: 'line',
                  data: data,
                  options: {
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      tooltip: { 
                          enabled: true,
                          callbacks: {
                           /*label: function(tooltipItem) {
                              var dataset = data['datasets'][tooltipItem.datasetIndex];
                              return dataset['label'];
                            },*/
                            afterLabel: function(tooltipItem) {
                              var dataset = data['datasets'][tooltipItem.datasetIndex];
                              var stdev = " - SD: " + dataset['deviation'][tooltipItem.dataIndex].toFixed(2) ;
                              return stdev;
                            }
                          }
                      }
                    }
                  }
                });
                
            });
        }
    },
    
    // section 5
    change_countries_by_count: function() {
        $('#sec5_countries_by_count').remove();
        $('#sec5_chart_container').append('<canvas id="sec5_countries_by_count"></canvas>');
        var mut=document.getElementById("sec5_options").value;
        var response = foca.lineages_count[mut];
        console.log(response)
            var ctx = document.getElementById("sec5_countries_by_count");
              var chart = new Chart(ctx, {
              type: 'pie',
              data: {
                labels: response.labels,
                datasets: [{
                  label: '# occurrences',
                  data: response.counts,
                  backgroundColor: generate_colors(response.counts.length)
                }]
              },
                  options: {
                      responsive:true
                  }
            });
    },
    
    get_countries_by_count: async function() {
        // install cairo library: sudo apt-get install libcairo2-dev libjpeg-dev libgif-dev
        
        var muts=document.getElementById("sec5_mutations").value;
        var hits=document.getElementById("sec5_hits").value;
        if(hits==""){
            hits=1;
        }
        
        if(muts==""){
            $("#sec5_options").hide();
            bootbox.alert("Put some mutation to execute the query!");
        }
        else{
            $('#sec5_action').html('wait...');
            document.getElementById("sec5_action").disabled=true;
            
            var mut_list=muts.split(",");
            foca.mutations=mut_list;
            
            $.ajax({
              method: "GET",
              url: server+"/countries_count_by_mutation/"+muts+"/"+hits
            })
              .done(function( msg ) {
                  $('#sec5_action').html('GO');
                  document.getElementById("sec5_action").disabled=false;
                  
                  var items="";
                  for (i=0; i<mut_list.length; i++){
                      items+="<option value='"+mut_list[i]+"' > "+mut_list[i]+"</option>"
                  }
                  document.getElementById("sec5_options").innerHTML=items;
                  $("#sec5_options").show();
                
                var output = JSON.parse(msg)
                document.getElementById('file_export_sec5').href = server+""+output["file_export"];
                foca.lineages_count=output
                
                 $('#sec5_countries_by_count').remove();
                $('#sec5_chart_container').append('<canvas id="sec5_countries_by_count"></canvas>');
        
                var response=output[mut_list[0]]
                var ctx = document.getElementById("sec5_countries_by_count");
                  var chart = new Chart(ctx, {
                  type: 'pie',
                  data: {
                    labels: response.labels,
                    datasets: [{
                      label: '# occurrences',
                      data: response.counts,
                      backgroundColor: generate_colors(response.counts.length)
                    }]
                  },
                  options: {
                      responsive:true
                  }
                });
              });
              
        }
    },
    
    // section 7
    change_mutations_by_count: function() {
        $('#sec7_mutations_by_count').remove();
        $('#sec7_chart_container').append('<canvas id="sec7_mutations_by_count"></canvas>');
        var mut=document.getElementById("sec7_options").value;
        var response = foca.lineages_count[mut];
        console.log(response)
            var ctx = document.getElementById("sec7_mutations_by_count");
              var chart = new Chart(ctx, {
              type: 'pie',
              data: {
                labels: response.labels,
                datasets: [{
                  label: '# occurrences',
                  data: response.counts,
                  backgroundColor: generate_colors(response.counts.length)
                }]
              },
                  options: {
                      responsive:true
                  }
            });
    },
    
    get_mutations_by_count: async function() {
        // install cairo library: sudo apt-get install libcairo2-dev libjpeg-dev libgif-dev
        
        var muts=document.getElementById("sec7_lineages").value;
        var hits=document.getElementById("sec7_hits").value;
        if(hits==""){
            hits=1;
        }
        
        if(muts==""){
            $("#sec7_options").hide();
            bootbox.alert("Put some mutation to execute the query!");
        }
        else{
            $('#sec7_action').html('wait...');
            document.getElementById("sec7_action").disabled=true;
            
            var mut_list=muts.split(",");
            foca.mutations=mut_list;
            
            $.ajax({
              method: "GET",
              url: server+"/mutations_count_by_lineage/"+muts+"/"+hits
            })
              .done(function( msg ) {
                  $('#sec7_action').html('GO');
                  document.getElementById("sec7_action").disabled=false;
                  
                  var items="";
                  for (i=0; i<mut_list.length; i++){
                      items+="<option value='"+mut_list[i]+"' > "+mut_list[i]+"</option>"
                  }
                  document.getElementById("sec7_options").innerHTML=items;
                  $("#sec7_options").show();
                
                var output = JSON.parse(msg)
                document.getElementById('file_export_sec7').href = server+""+output["file_export"];
                foca.lineages_count=output
                
                 $('#sec7_mutations_by_count').remove();
                $('#sec7_chart_container').append('<canvas id="sec7_mutations_by_count"></canvas>');
        
                var response=output[mut_list[0]]
                var ctx = document.getElementById("sec7_mutations_by_count");
                  var chart = new Chart(ctx, {
                  type: 'pie',
                  data: {
                    labels: response.labels,
                    datasets: [{
                      label: '# occurrences',
                      data: response.counts,
                      backgroundColor: generate_colors(response.counts.length)
                    }]
                  },
                  options: {
                      responsive:true
                  }
                });
              });
              
        }
    },
    
    
  }
})();
