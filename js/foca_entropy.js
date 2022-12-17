var server =  get_host();

var foca_entropy = (function () {
    
  // Keep this variable private inside this closure scope
  var proteins = [];
  var locations = [];
  
  // Expose these functions via an interface while hiding
  // the implementation of the module within the function() block

  return {
    
    init: function() {
      foca_entropy.fills_proteins();
      foca_entropy.fills_locations();
      
      foca_entropy.get_entropy('init');
	  foca_entropy.get_entropy_by_period('init');
	  foca_entropy.get_plot_entropy('init');
    },
    
    fills_locations: async function () {
    
        $.ajax({
          method: "GET",
          url: server+"/get_locations"
        })
          .done(function( msg ) {
            var output = JSON.parse(msg)
            foca_entropy.locations = output.msg
            var locations_select_html = "<option value='All'>All</option>"
            for (var i=0; i<foca_entropy.locations.length; i++){
                locations_select_html += "<option value='"+foca_entropy.locations[i]+"' > "+foca_entropy.locations[i]+"</option>"
            }
            document.getElementById("sec3_location").innerHTML = locations_select_html;
            
            $(document).ready(function(){
        		$('#sec3_location').selectpicker();
        		$('#sec3_location').val('All');
        		$('#sec3_location').selectpicker('refresh');
        		
        	});
            
          });
    },

    fills_proteins: async function () {
        $.ajax({
          method: "GET",
          url: server+"/get_proteins"
        })
          .done(function( msg ) {
            var output = JSON.parse(msg)
            foca_entropy.proteins = output.msg
            var proteins_select_html = ""
            for (var i=0; i<foca_entropy.proteins.length; i++){
                proteins_select_html += "<option value='"+foca_entropy.proteins[i]+"' > "+foca_entropy.proteins[i]+"</option>"
            }
            document.getElementById("sec1_proteins").innerHTML = proteins_select_html;
            document.getElementById("sec2_proteins").innerHTML = proteins_select_html;
			
       		$(document).ready(function(){
        		$('#sec1_proteins').selectpicker();
				$('#sec2_proteins').selectpicker();
				
        		/*$('#sec1_proteins').val(['All']);
        		$('#sec1_proteins').selectpicker('refresh');
        		$('#sec2_proteins').val(['All']);
        		$('#sec2_proteins').selectpicker('refresh');*/
        			
        	});
        	
          });
    },
    
    get_plot_entropy: async function (init="") {
        var lineage = $('#sec3_lineage').val();
        var location="All"
        if(init==''){
        	location=$('#sec3_location').val()
        }
        
        /*if(proteins.length==0){
            bootbox.alert("Choose at least one protein to execute the query!");
        }
        else{*/
            //proteins = proteins.join(',');
            $('#sec3_action').html('wait...');
            document.getElementById("sec3_action").disabled=true;
            
            $.ajax({
              method: "GET",
              url: server+"/plot_entropy_position_analysis_by_period/"+lineage+"/"+location
            })
            .done(function( msg ) {
                 $('#sec3_action').html('GO');
                 document.getElementById("sec3_action").disabled=false;
                  
                //$('#sec6_domains').remove();
                //$('#sec6_chart_container').append('<canvas id="sec6_domains"></canvas>');
                
                var response = JSON.parse(msg)
                console.log(response)
                Plotly.newPlot( document.getElementById('sec_chart_container'), response.data);
                
            });
        //}
    },
    
    get_entropy: async function (tip='') {
    	var protein = ['All'];
    	if(tip!='init'){
        	var protein = $('#sec1_proteins').val();
        	if(protein.length==0){
        		protein=["All"];
        	}
        }
        protein=protein.join(",");
        
        var lineage = $('#sec1_lineage').val();
        lineage=lineage.replace(".","-");
        var position = $('#sec1_position').val();
        var effect = $('#sec1_effect').val();
        var count = $('#sec1_count').val();
        var proportion = $('#sec1_proportion').val();
        proportion=proportion.replace(".","-");
        
        if(position==""){
        	position="All"
        }
        if(count==""){
        	count="1"
        }
        if(proportion==""){
        	proportion="0.2"
        }
        
        $('#sec1_action').html('wait...');
        document.getElementById("sec1_action").disabled=true;
        $('#file_export_sec1').hide();
        
        $.ajax({
          method: "GET",
          url: server+'/entropy_position_analysis'+'/'+lineage+'/'+protein+'/'+position+'/'+effect+'/'+count+'/'+proportion
        })
        .done(function( msg ) {
        
              $('#sec1_action').html('GO');
             document.getElementById("sec1_action").disabled=false;
              
            var response = JSON.parse(msg);
            if(response.error==""){
            	$('#results').html('<div class="col-md-12" > <table id="table_entropy" class="stripe" width="100%" > </table> </div>');
            	if(response.table_entropy.length > 0){
	   				$('#table_entropy').DataTable( {
						data: response.table_entropy,
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
    
    get_entropy_by_period: async function (tip='') {
    	var proteins = ['All']
    	if(tip!='init'){
        	var proteins = $('#sec2_proteins').val();
        	if(proteins.length==0){
        		proteins=["All"];
        	}
        }
        protein=proteins.join(",");
        
        var lineage = $('#sec2_lineage').val();
        lineage=lineage.replace(".","-");
        var position = $('#sec2_position').val();
        var effect = $('#sec2_effect').val();
        var month = $('#sec2_month').val();
        var year = $('#sec2_year').val();
        
        if(position==""){
        	position="All"
        }
        
        proteins = proteins.join(',');
        $('#sec2_action').html('wait...');
        document.getElementById("sec2_action").disabled=true;
        $('#file_export_sec2').hide();
        
        $.ajax({
          method: "GET",
          url: server+'/entropy_position_analysis_by_period'+'/'+lineage+'/'+protein+'/'+position+'/'+effect+'/'+month+'/'+year
        })
        .done(function( msg ) {
        
              $('#sec2_action').html('GO');
             document.getElementById("sec2_action").disabled=false;
              
            var response = JSON.parse(msg);
            if(response.error==""){
            	$('#results_period').html('<div class="col-md-12" > <table id="table_entropy_period" class="stripe" width="100%" > </table> </div>');
            	if(response.table_entropy.length > 0){
	   				$('#table_entropy_period').DataTable( {
						data: response.table_entropy,
						columns: response.columns
					} );
				}
				
				$('#file_export_sec2').show();
				document.getElementById('file_export_sec2').href = server+""+response["file_export"];
			}
			else{
				bootbox.alert(response['error']);
			}
            
        });
    },
    
    
  }
})();


