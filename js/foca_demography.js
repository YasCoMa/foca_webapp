var server = get_host();

var foca_demography = (function () {
    
  	var locations=[];
	var lineages=[];
	var status=[];

  // Expose these functions via an interface while hiding
  // the implementation of the module within the function() block

  return {
    
    init: function() {
      foca_demography.fills_locations();
      foca_demography.fills_lineages();
      foca_demography.fills_status();
      
      foca_demography.get_plots();
	  
	  foca_demography.get_forecasting('init')
	  
	  foca_demography.get_table('init');
	  
    },
    
    fills_locations: async function () {
    
        $.ajax({
          method: "GET",
          url: server+"/get_locations"
        })
          .done(function( msg ) {
            var output = JSON.parse(msg)
            foca_demography.locations = output.msg
            var locations_select_html = "<option value='All'>All</option>"
            for (var i=0; i<foca_demography.locations.length; i++){
                locations_select_html += "<option value='"+foca_demography.locations[i]+"' > "+foca_demography.locations[i]+"</option>"
            }
            document.getElementById("sec1_locations").innerHTML = locations_select_html;
            document.getElementById("secf_locations").innerHTML = locations_select_html;
            
            $(document).ready(function(){
        		$('#sec1_locations').selectpicker();
        		$('#sec1_locations').val('All');
        		$('#sec1_locations').selectpicker('refresh');
        		
        		
        		$('#secf_locations').selectpicker();
        		$('#secf_locations').val('All');
        		$('#secf_locations').selectpicker('refresh');
        		
        	});
            
          });
    },
    
    fills_lineages: async function () {
    
        $.ajax({
          method: "GET",
          url: server+"/get_lineages"
        })
          .done(function( msg ) {
            var output = JSON.parse(msg)
            foca_demography.lineages = output.msg
            var locations_select_html = "<option value='All'>All</option>"
            for (var i=0; i<foca_demography.lineages.length; i++){
                locations_select_html += "<option value='"+foca_demography.lineages[i]+"' > "+foca_demography.lineages[i]+"</option>"
            }
            document.getElementById("sec1_lineages").innerHTML = locations_select_html;
            
            $(document).ready(function(){
        		$('#sec1_lineages').selectpicker();
        		$('#sec1_lineages').val('All');
        		$('#sec1_lineages').selectpicker('refresh');
        		
        	});
            
          });
    },
    
    fills_status: async function () {
    
        $.ajax({
          method: "GET",
          url: server+"/get_status"
        })
          .done(function( msg ) {
            var output = JSON.parse(msg)
            foca_demography.status = output.msg
            var locations_select_html = "<option value='All'>All</option>"
            for (var i=0; i<foca_demography.status.length; i++){
                locations_select_html += "<option value='"+foca_demography.status[i]+"' > "+foca_demography.status[i]+"</option>"
            }
            document.getElementById("sec1_status").innerHTML = locations_select_html;
            
            $(document).ready(function(){
        		$('#sec1_status').selectpicker();
        		$('#sec1_status').val('All');
        		$('#sec1_status').selectpicker('refresh');
        		
        	});
            
          });
    },
    
    // section forecasting
    get_forecasting: async function (tip='') {
    	var location = 'All';
    	if(tip!='init'){
        	var location = document.getElementById("secf_locations").value;
        }
        
        $('#secf_action').html('wait...');
        document.getElementById("secf_action").disabled=true;
        
        $.ajax({
          method: "GET",
          url: server+"/get_plot_forecasting/"+location+"/Spike"
        })
        .done(function( msg ) {
              $('#secf_action').html('GO');
             document.getElementById("secf_action").disabled=false;
            
            var response = JSON.parse(msg)
            document.getElementById('img_forecasting').src=server+""+response.file_export
            $('#secf_chart_container').show()
        });
    },
    
    get_plots: async function() {
        // install cairo library: sudo apt-get install libcairo2-dev libjpeg-dev libgif-dev
        
        $.ajax({
          method: "GET",
          url: server+"/get_demography_plots"
        })
          .done(function( msg ) {
          
          
          	 var output = JSON.parse(msg)
            if(output['error']==""){
	            var response=output['global_geo_data']
	            var info=output['global_geo_info']
	            
	            var data = google.visualization.arrayToDataTable(response);
	            var options = {
	            	displayMode: 'regions',
	            	region: 'world',
	            	resolution: 'countries',
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
					if(Object.keys(info).includes(e.region)){
						document.getElementById('region-info').innerHTML = "<p>"+info[e.region]+"</p>";
					}
					else{
						document.getElementById('region-info').innerHTML = "<p>This Country has no data to show!</p>"
					}
				  });
				  chart.draw(view, options);
				  
	            $('#genders_age').remove();
	            $('#sec1_chart_container').append('<canvas id="genders_age"></canvas>');
	    
	            var response=output['plot_age']
	            var ctx = document.getElementById("genders_age");
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
	            
	            $('#genders_voc').remove();
	            $('#sec2_chart_container').append('<canvas id="genders_voc"></canvas>');
	    
	            var response=output['plot_voc']
	            var ctx = document.getElementById("genders_voc");
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
	            
	            $('#genders_status').remove();
	            $('#sec3_chart_container').append('<canvas id="genders_status"></canvas>');
	    
	            var response=output['plot_status']
	            var ctx = document.getElementById("genders_status");
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
	            
	            $('#ages_vocs').remove();
	            $('#sec4_chart_container').append('<canvas id="ages_vocs"></canvas>');
	    
	            var response=output['plot_age_voc']
	            var ctx = document.getElementById("ages_vocs");
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
	            
	            $('#ages_status').remove();
	            $('#sec5_chart_container').append('<canvas id="ages_status"></canvas>');
	    
	            var response=output['plot_age_status']
	            var ctx = document.getElementById("ages_status");
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
	            
	            $('#status_vocs').remove();
	            $('#sec6_chart_container').append('<canvas id="status_vocs"></canvas>');
	    
	            var response=output['plot_status_voc']
	            var ctx = document.getElementById("status_vocs");
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
	        	bootbox.alert(output['error']);	
	        }
	        
          });
    },
    
    get_table: async function (tip='') {
    	var lineage = 'All';
	    var location = 'All';
	    var status = 'All';
	    var gender = 'All';
	    var age = '0';
	    
    	if(tip!='init'){
			var lineage = $('#sec1_lineages').val();
		    var location = $('#sec1_locations').val();
		    var status = $('#sec1_status').val();
		    var gender = $('#sec1_gender').val();
		    var age = $('#sec1_age').val();
        }
            
        if(age==""){
        	age="0"
        }
        
        $('#sec1_action').html('wait...');
        document.getElementById("sec1_action").disabled=true;
        $('#file_export_sec1').hide();
        
        $.ajax({
          method: "GET",
          url: server+'/get_table_demography'+'/'+lineage+'/'+location+'/'+status+'/'+gender+'/'+age
        })
        .done(function( msg ) {
          //console.log(msg)
        
              $('#sec1_action').html('GO');
             document.getElementById("sec1_action").disabled=false;
              
            var response = JSON.parse(msg);
            if(response.error==""){
            	$('#results').html('<div class="col-md-12" > <table id="table_demography" class="stripe" width="100%" > </table> </div>');
            	if(response.table.length > 0){
	   				$('#table_demography').DataTable( {
						data: response.table,
						columns: response.columns
					} );
				}
				
				$('#file_export_sec1').show();
				document.getElementById('file_export_sec1').href = server+""+response["file_export"];
			}
			else{
				bootbox.alert(response['error']);
			}
            
        });
        
    },
    
    
  }
})();


