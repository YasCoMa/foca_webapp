
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

var server =  get_host();

var foca_summary = (function () {
    
  // Keep this variable private inside this closure scope
  var proteins = [];
  var locations = [];
  var mutations = [];
	var lineages=[];
  var lineages_count=[];
  var country_count=[];
  var mutations_count=[];
  var unique_lineages_count=[];
  
  // Expose these functions via an interface while hiding
  // the implementation of the module within the function() block

  return {
    
    init: function() {
      foca_summary.fills_last_update();
      foca_summary.fills_proteins();
      foca_summary.fills_locations();
      foca_summary.fills_lineages();
      
      foca_summary.get_plots();
      
      foca_summary.get_missense_by_period('init');
	  foca_summary.get_lineages_by_count();
	  
	  foca_summary.get_domains_by_protein();
	  foca_summary.get_countries_by_count();
	  
	  foca_summary.get_mutations_by_count('init');
	  foca_summary.get_unique_lineages_by_count('init');
	  //foca_summary.get_mutations_peptide('init');
	  
	  foca_summary.get_forecasting('init')
    },
    
    fills_lineages: async function () {
    
        $.ajax({
          method: "GET",
          url: server+"/get_lineages"
        })
          .done(function( msg ) {
            var output = JSON.parse(msg)
            foca_summary.lineages = output.msg
            //var locations_select_html = "<option value='All'>All</option>"
            var locations_select_html = ""
            for (var i=0; i<foca_summary.lineages.length; i++){
                locations_select_html += "<option value='"+foca_summary.lineages[i]+"' > "+foca_summary.lineages[i]+"</option>"
            }
            document.getElementById("sec7_lineages").innerHTML = locations_select_html;
            document.getElementById("sec8_lineages").innerHTML = locations_select_html;
            
            $(document).ready(function(){
        		$('#sec7_lineages').selectpicker();
        		$('#sec7_lineages').val('B.1.617.2');
        		$('#sec7_lineages').selectpicker('refresh');
        		
        		$('#sec8_lineages').selectpicker();
        		$('#sec8_lineages').val('B.1.617.2');
        		$('#sec8_lineages').selectpicker('refresh');
        		
        	});
            
          });
    },

    fills_proteins: async function () {
        document.getElementById("sec1_last_update").innerHTML="getting data";
        $.ajax({
          method: "GET",
          url: server+"/get_proteins"
        })
          .done(function( msg ) {
            var output = JSON.parse(msg)
            foca_summary.proteins = output.msg
            var proteins_select_html = ""
            for (var i=0; i<foca_summary.proteins.length; i++){
                proteins_select_html += "<option value='"+foca_summary.proteins[i]+"' > "+foca_summary.proteins[i]+"</option>"
            }
            document.getElementById("sec2_proteins").innerHTML = proteins_select_html;
            document.getElementById("secf_proteins").innerHTML = proteins_select_html;
            
            //document.getElementById("sec6_proteins").innerHTML = proteins_select_html;
            //document.getElementById("sec9_protein").innerHTML = proteins_select_html;
			
       		$(document).ready(function(){
        		$('#sec2_proteins').selectpicker();
				$('#secf_proteins').selectpicker();
        		
        		$('#sec2_proteins').val(['Spike']);
        		$('#sec2_proteins').selectpicker('refresh');
        	
        		$('#secf_proteins').val('Spike');
        		$('#secf_proteins').selectpicker('refresh');
        		
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
            foca_summary.locations = output.msg
            var locations_select_html = "<option value='All'>All</option>"
            for (var i=0; i<foca_summary.locations.length; i++){
                locations_select_html += "<option value='"+foca_summary.locations[i]+"' > "+foca_summary.locations[i]+"</option>"
            }
            document.getElementById("sec2_locations").innerHTML = locations_select_html;
            document.getElementById("secf_locations").innerHTML = locations_select_html;
            
            //document.getElementById("sec6_locations").innerHTML = locations_select_html;
            
            $(document).ready(function(){
        		$('#sec2_locations').selectpicker();
        		$('#sec2_locations').val('All');
        		$('#sec2_locations').selectpicker('refresh');
        		
        		$('#secf_locations').selectpicker();
        		$('#secf_locations').val('All');
        		$('#secf_locations').selectpicker('refresh');
        		
        	});
            
          });
    },
    
    // Descriptive analysis - summary
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
    
    // section forecasting
    get_forecasting: async function (tip='') {
    	var proteins = 'Spike'
    	var location = 'All';
    	if(tip!='init'){
        	var proteins = $('#secf_proteins').val();
        	var location = document.getElementById("secf_locations").value;
        }
        
        if(proteins.length==0){
            bootbox.alert("Choose at least one protein to execute the query!");
        }
        else{
            //proteins = proteins.join(',');
            $('#secf_action').html('wait...');
            document.getElementById("secf_action").disabled=true;
            
            $.ajax({
              method: "GET",
              url: server+"/get_plot_forecasting_protein/"+location+"/"+proteins
            })
            .done(function( msg ) {
                  $('#secf_action').html('GO');
                 document.getElementById("secf_action").disabled=false;
                
                var response = JSON.parse(msg)
                document.getElementById('img_forecasting').src=server+""+response.file_export
                $('#secf_chart_container').show()
            });
        }
    },
    
    get_plots: async function() {
        // install cairo library: sudo apt-get install libcairo2-dev libjpeg-dev libgif-dev
        
        $.ajax({
          method: "GET",
          url: server+"/get_br_state_plots"
        })
          .done(function( msg ) {
          
          
          	 var output = JSON.parse(msg)
            if(output['error']==""){
	            var response=output['global_geo_data']
	            var info=output['global_geo_info']
	            
	            var data = google.visualization.arrayToDataTable(response);
	            var options = {
	            	displayMode: 'regions',
	            	region: 'BR',
				    resolution: 'provinces',
					enableRegionInteractivity: 'true'
				  };
				  var view = new google.visualization.DataView(data);
				  // only include first column
				  view.setColumns([0,1]);

				  var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
				  //chart.draw(data, options);
				  
				  google.visualization.events.addListener(chart, 'regionClick', function (e) {
				  console.log(e)
				  	document.getElementById('region-info').style.visibility="visible";
					if(Object.keys(info['state_mutations']).includes(e.region) && Object.keys(info['state_lineages']).includes(e.region)){
						$('#geo1_mutation').remove();
					    $('#geo1_chart_container').append('<canvas id="geo1_mutation"></canvas>');
				
					    var response=info['state_mutations'][e.region]
					    var ctx = document.getElementById("geo1_mutation");
					      var chart = new Chart(ctx, {
					      type: 'bar',
					      data: {
					        labels: response.labels,
					        datasets: response.datasets
					      },
					      options: {
					          responsive:true
					      }
					    });
					    
					    $('#geo2_lineage').remove();
					    $('#geo2_chart_container').append('<canvas id="geo2_lineage"></canvas>');
				
					    var response=info['state_lineages'][e.region]
					    var ctx = document.getElementById("geo2_lineage");
					      var chart = new Chart(ctx, {
					      type: 'bar',
					      data: {
					        labels: response.labels,
					        datasets: response.datasets
					      },
					      options: {
					          responsive:true
					      }
					    });
					}
					else{
						
					}
				  });
				  chart.draw(view, options);
				  
	            
	        }
	        else{
	        	bootbox.alert(output['error']);	
	        }
	        
          });
    },
    
    // section 2
    get_missense_by_period: async function (tip='') {
    	var proteins = ['Spike']
    	var location = 'All';
    	if(tip!='init'){
        	var proteins = $('#sec2_proteins').val();
        	var location = document.getElementById("sec2_locations").value;
        }
        
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
        var response = foca_summary.lineages_count[mut];
        console.log(response)
            var ctx = document.getElementById("sec3_lineages_by_count");
              var chart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: response.labels,
                datasets: [{
                  label: 'Proportion',
                  data: response.counts,
                  backgroundColor: generate_colors(response.counts.length)
                }]
              },
                  options: {
                      responsive:true,
		                  plugins: {
		                  	legend: {
		                  		display: false
		                  	}
		                  }
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
            foca_summary.mutations=mut_list;
            
            $.ajax({
              method: "GET",
              url: server+"/lineages_count_by_mutation/"+muts+"/"+hits
            })
              .done(function( msg ) {
              		$('#sec3_action').html('GO');
		              document.getElementById("sec3_action").disabled=false;
		              
                var output = JSON.parse(msg)
                console.log(output);
                if(output['error']==""){
		              var items="";
		              for (i=0; i<mut_list.length; i++){
		                  items+="<option value='"+mut_list[i]+"' > "+mut_list[i]+"</option>"
		              }
		              document.getElementById("sec3_options").innerHTML=items;
		              $("#sec3_options").show();
		            
		            document.getElementById('file_export_sec3').href = server+""+output["file_export"];
		            foca_summary.lineages_count=output
		            
		             $('#sec3_lineages_by_count').remove();
		            $('#sec3_chart_container').append('<canvas id="sec3_lineages_by_count"></canvas>');
		    
		            var response=output[mut_list[0]]
		            var ctx = document.getElementById("sec3_lineages_by_count");
		              var chart = new Chart(ctx, {
		              type: 'bar',
		              data: {
		                labels: response.labels,
		                datasets: [{
		                  label: 'Proportion',
		                  data: response.counts,
		                  backgroundColor: generate_colors(response.counts.length)
		                }]
		              },
		              options: {
		                  responsive:true,
		                  plugins: {
		                  	legend: {
		                  		display: false
		                  	}
		                  }
		              }
		            });
		        }
		        else{
		        	bootbox.alert(output['error']);	
		        }
		        
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
        var response = foca_summary.country_count[mut];
        console.log(response)
            var ctx = document.getElementById("sec5_countries_by_count");
              var chart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: response.labels,
                datasets: [{
                  label: 'Proportion',
                  data: response.counts,
                  backgroundColor: generate_colors(response.counts.length)
                }]
              },
                  options: {
                      responsive:true,
		                  plugins: {
		                  	legend: {
		                  		display: false
		                  	}
		                  }
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
            foca_summary.mutations=mut_list;
            
            $.ajax({
              method: "GET",
              url: server+"/countries_count_by_mutation/"+muts+"/"+hits
            })
              .done(function( msg ) {
              		$('#sec5_action').html('GO');
		              document.getElementById("sec5_action").disabled=false;
		              
                  var output = JSON.parse(msg)
                if(output['error']==""){
				      var items="";
		              for (i=0; i<mut_list.length; i++){
		                  items+="<option value='"+mut_list[i]+"' > "+mut_list[i]+"</option>"
		              }
		              document.getElementById("sec5_options").innerHTML=items;
		              $("#sec5_options").show();
		            
		            document.getElementById('file_export_sec5').href = server+""+output["file_export"];
		            foca_summary.country_count=output
		            
		             $('#sec5_countries_by_count').remove();
		            $('#sec5_chart_container').append('<canvas id="sec5_countries_by_count"></canvas>');
		    
		            var response=output[mut_list[0]]
		            var ctx = document.getElementById("sec5_countries_by_count");
		              var chart = new Chart(ctx, {
		              type: 'bar',
		              data: {
		                labels: response.labels,
		                datasets: [{
		                  label: 'Proportion',
		                  data: response.counts,
		                  backgroundColor: generate_colors(response.counts.length)
		                }]
		              },
		              options: {
		                  responsive:true,
		                  plugins: {
		                  	legend: {
		                  		display: false
		                  	}
		                  }
		              }
		            });
		         }
		        else{
		        	bootbox.alert(output['error']);	
		        }
		         
		            
		          });
              
        }
    },
    
    // section 6
    get_domains_by_protein: async function () {
        document.getElementById('sec6_description').innerHTML="";
        /*if(proteins.length==0){
            bootbox.alert("Choose at least one protein to execute the query!");
        }
        else{*/
            //proteins = proteins.join(',');
            //$('#sec6_action').html('wait...');
            //document.getElementById("sec6_action").disabled=true;
            
            $.ajax({
              method: "GET",
              url: server+"/domain_counts_by_protein"
            })
            .done(function( msg ) {
                 // $('#sec6_action').html('GO');
                 //document.getElementById("sec6_action").disabled=false;
                  
                //$('#sec6_domains').remove();
                //$('#sec6_chart_container').append('<canvas id="sec6_domains"></canvas>');
                
                var response = JSON.parse(msg)
                Plotly.newPlot( document.getElementById('sec6_chart_container'), response.data);
                document.getElementById('sec6_description').innerHTML=response.info_domain;
            });
        //}
    },
    
    // section 7
    change_mutations_by_count: function() {
        $('#sec7_mutations_by_count').remove();
        $('#sec7_chart_container').append('<canvas id="sec7_mutations_by_count"></canvas>');
        var mut=document.getElementById("sec7_options").value;
        var response = foca_summary.mutations_count[mut];
        console.log(response)
            var ctx = document.getElementById("sec7_mutations_by_count");
              var chart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: response.labels,
                datasets: [{
                  label: 'Proportion',
                  data: response.counts,
                  backgroundColor: generate_colors(response.counts.length)
                }]
              },
                  options: {
                      responsive:true,
		                  plugins: {
		                  	legend: {
		                  		display: false
		                  	}
		                  }
                  }
            });
    },
    
    get_mutations_by_count: async function(tip='') {
        // install cairo library: sudo apt-get install libcairo2-dev libjpeg-dev libgif-dev
        var muts='B.1.617.2';
        if(tip==''){
	        var muts=document.getElementById("sec7_lineages").value;
        }
        
        var hits=document.getElementById("sec7_hits").value;
        if(hits==""){
            hits=1;
        }
        
        if(muts==""){
            $("#sec7_options").hide();
            bootbox.alert("Put some Lineage to execute the query!");
        }
        else{
            $('#sec7_action').html('wait...');
            document.getElementById("sec7_action").disabled=true;
            
            var mut_list=muts.split(",");
            foca_summary.mutations=mut_list;
            
            $.ajax({
              method: "GET",
              url: server+"/mutations_count_by_lineage/"+muts+"/"+hits
            })
              .done(function( msg ) {
              var output = JSON.parse(msg)
              	$('#sec7_action').html('GO');
		        document.getElementById("sec7_action").disabled=false;
		              
                if(output['error']==""){
		              var items="";
		              for (i=0; i<mut_list.length; i++){
		                  items+="<option value='"+mut_list[i]+"' > "+mut_list[i]+"</option>"
		              }
		              document.getElementById("sec7_options").innerHTML=items;
		              //$("#sec7_options").show();
		            
		            document.getElementById('file_export_sec7').href = server+""+output["file_export"];
		            foca_summary.mutations_count=output
		            
		             $('#sec7_mutations_by_count').remove();
		            $('#sec7_chart_container').append('<canvas id="sec7_mutations_by_count"></canvas>');
		    
		            var response=output[mut_list[0]]
		            var ctx = document.getElementById("sec7_mutations_by_count");
		              var chart = new Chart(ctx, {
		              type: 'bar',
		              data: {
		                labels: response.labels,
		                datasets: [{
		                  label: 'Proportion',
		                  data: response.counts,
		                  backgroundColor: generate_colors(response.counts.length)
		                }]
		              },
		              options: {
		                  responsive:true,
		                  plugins: {
		                  	legend: {
		                  		display: false
		                  	}
		                  }
		              }
		            });
		         }
		        else{
		        	bootbox.alert(output['error']);	
		        }
		            
              });
              
        }
    },
    
    // section 8
    change_unique_lineages_by_count: function() {
        $('#sec8_mutations_by_count').remove();
        $('#sec8_chart_container').append('<canvas id="sec8_mutations_by_count"></canvas>');
        var mut=document.getElementById("sec8_options").value;
        var response = foca_summary.unique_lineages_count[mut];
        console.log(response)
            var ctx = document.getElementById("sec8_mutations_by_count");
              var chart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: response.labels,
                datasets: [{
                  label: 'Proportion',
                  data: response.counts,
                  backgroundColor: generate_colors(response.counts.length)
                }]
              },
                  options: {
                      responsive:true,
		                  plugins: {
		                  	legend: {
		                  		display: false
		                  	}
		                  }
                  }
            });
    },
    
    get_unique_lineages_by_count: async function(tip='') {
        // install cairo library: sudo apt-get install libcairo2-dev libjpeg-dev libgif-dev
        var muts='B.1.617.2';
        if(tip==''){
	        var muts=document.getElementById("sec8_lineages").value;
        }
        
        var hits=document.getElementById("sec8_hits").value;
        if(hits==""){
            hits=1;
        }
        
        if(muts==""){
            $("#sec8_options").hide();
            bootbox.alert("Put some lineage to execute the query!");
        }
        else{
            $('#sec8_action').html('wait...');
            document.getElementById("sec8_action").disabled=true;
            
            var mut_list=muts.split(",");
            foca_summary.mutations=mut_list;
            
            $.ajax({
              method: "GET",
              url: server+"/unique_mutations_count_by_lineage/"+muts+"/"+hits
            })
              .done(function( msg ) {
              		$('#sec8_action').html('GO');
		            document.getElementById("sec8_action").disabled=false;
		              
                var output = JSON.parse(msg)
                if(output['error']==""){
		              var items="";
		              for (i=0; i<mut_list.length; i++){
		                  items+="<option value='"+mut_list[i]+"' > "+mut_list[i]+"</option>"
		              }
		              document.getElementById("sec8_options").innerHTML=items;
		              //$("#sec8_options").show();
		            
		            document.getElementById('file_export_sec8').href = server+""+output["file_export"];
		            foca_summary.unique_lineages_count=output
		            
		             $('#sec8_mutations_by_count').remove();
		            $('#sec8_chart_container').append('<canvas id="sec8_mutations_by_count"></canvas>');
		    
		            var response=output[mut_list[0]]
		            var ctx = document.getElementById("sec8_mutations_by_count");
		              var chart = new Chart(ctx, {
		              type: 'bar',
		              data: {
		                labels: response.labels,
		                datasets: [{
		                  label: 'Proportion',
		                  data: response.counts,
		                  backgroundColor: generate_colors(response.counts.length)
		                }]
		              },
		              options: {
		                  responsive:true,
		                  plugins: {
		                  	legend: {
		                  		display: false
		                  	}
		                  }
		              }
		            });
		        }
		        else{
		        	bootbox.alert(output['error']);	
		        }
		        
              });
              
        }
    },
    
    // section 9
    get_mutations_peptide: async function (tip='') {
    	var protein = 'Spike'
    	if(tip!='init'){
        	var protein = $('#sec9_protein').val();
        }
        
        // install cairo library: sudo apt-get install libcairo2-dev libjpeg-dev libgif-dev
        
        var peptide=document.getElementById("sec9_peptide").value;
        
        /*var hits=document.getElementById("sec7_hits").value;
        if(hits==""){
            hits=1;
        }*/
        
        if(peptide=="" || peptide.length<9 || peptide.length>30){
            bootbox.alert("Put some peptide sequence to execute the query, with length > 9 and < 30!");
        }
        else{
            $('#sec9_action').html('wait...');
            document.getElementById("sec9_action").disabled=true;
            $('#sec9_muts').hide();
            
            $.ajax({
              method: "GET",
              url: server+"/get_mutations_peptide/"+protein+"/"+peptide
            })
              .done(function( msg ) {
              var output = JSON.parse(msg)
              	$('#sec9_action').html('GO');
		        document.getElementById("sec9_action").disabled=false;
		              
                if(output['error']==""){
		             
		            document.getElementById('file_export_sec9').href = server+""+output["file_export"];
		            
		            $('#sec9_mutations_by_count').remove();
		            $('#sec9_chart_container').append('<canvas id="sec9_mutations_by_count"></canvas>');
		    		
		    		var textout="";
		    		if(output['mutations_nodb'].length > 0){
		    			textout+='<br /><b>Exclusive mutation(s):</b> '+output['mutations_nodb'].join('; ')
		    		}
		    		if(output['mutations_indb'].length > 0){
		    			textout+='<br /><b>Mutation(s) in database:</b> '+output['mutations_indb'].join('; ')
		    		}
		    		$('#sec9_muts').html(textout);
		    		$('#sec9_muts').show();
		    		
		            var response=output
		            /*var ctx = document.getElementById("sec9_mutations_by_count");
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
		            });*/
		            
		         }
		        else{
		        	if(output["mutations"]!=""){
		        		$('#sec9_muts').show();
		            	$('#sec9_muts').html('Exclusive mutation(s): <br />'+output['mutations_nodb'].join('<br/>'));
		        	}
		        	
		        	bootbox.alert(output['error']);	
		        	
		        }
		            
              });
              
        }
    },
    
    
  }
})();

