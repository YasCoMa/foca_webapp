var server =  get_host();

var foca_structural = (function () {
    
  // Keep this variable private inside this closure scope
  var proteins = [];
  var locations = [];
  var mutations = [];
  var lineages_count=[];
  var country_count=[];
  var mutations_count=[];
  var unique_lineages_count=[];
  
  // Expose these functions via an interface while hiding
  // the implementation of the module within the function() block

  return {
    
    
    // Structural & functional analysis
    execute_struct_effect: async function() {
    	
    	$('#sec_struct').show();
    
    	let seq=document.getElementById('seq').value.replace('*','').toUpperCase();
		aas=['A','C','D','E','F','G','H','I','K','L','M','N','P','Q','R','S','T','V','W','Y','X']
		caa=0
		var i = 0;
		for( i=0; i<seq.length; i++){
			if( aas.includes(seq[i]) ){
				caa+=1;
			}
		}
    	let email=document.getElementById('email').value;
    	
    	$('#sec_result').hide();
    	$('#sec_struct').hide();
    	$('#sec_info').show();
    	
    	document.getElementById('struct_action').disabled=true;
    	document.getElementById('struct_action').innerHTML="Wait...";
    	
    	if(! seq.startsWith(">") && caa==seq.length && ! seq=="" && seq.length>1000 && seq.length<1280 && email!='' && email.split("@").length==2){
    		
			$.ajax({
			   url: server+'/structural_functional_analysis',
			   type: 'post',
			   data: {sequence: seq, email: email},
			   success: function(response){
			   		//console.log(response)
			   		
			   		var output = JSON.parse(response)
			   		
					$(document).ready(function() {
			   		
			   			$('#sec_info').hide();
			   			$('#sec_result').show();
			   			
			   			document.getElementById('struct_action').disabled=false;
    					document.getElementById('struct_action').innerHTML="Submit";
    					
			   			var title=""
			   			/*if(output.table_stability.length > 0){
			   				title="<hr/> <h4>Stability information: </h4> <br />";
			   			}*/
			   			
			   			if(output.table_mutations.length > 0){
			   				document.getElementById('results').innerHTML='<div class="col-md-12" > <br /> <div id="general_features"> </div> </div> <div class="col-md-12" > <h4>Mutations: </h4> <br /> <table id="table_mutations" class="stripe"  > </table> </div> <div class="col-md-12" > '+title+' <table id="table_stability" class="stripe" > </table> </div>';
			   			
				   			// destroy and recreate divs
							$('#table_mutations').DataTable( {
								data: output.table_mutations,
								columns: [
									{ title: "Mutation" },
									{ title: "Snap effect" },
									{ title: "Snap prediction" },
									{ title: "AA group ref" },
									{ title: "AA group alt" }
								]
							} );
						}
						
			   			if(output['error']==""){
			   				document.getElementById('radio').innerHTML="";
			   				document.getElementById('radio').innerHTML=jmolRadio("!quit; zap; load /foca/modules/proteins/Spike.pdb; cartoon on; cartoon only; rotate BEST; select "+output['mutations']+"; color blue; spacefill on; ", "", false );
    						Jmol.controls._click(document.getElementById('jmolRadioGroup0_0'));
			   				
					    	$('#sec_struct').show();
    	
			   				$('#file_export_sec').show();
				   			document.getElementById('file_export_sec').href = server+""+output["file_export"];
				   			
				   			domains="";
				   			if(output['domains']!=""){
				   				domains = "<br /> "+output['domains'];
				   			}
				   			
				   			if(output['error_email']==""){
				   				$('#general_features').html('<p> '+output.error_email+' <br /> <b>RMSD:</b> '+output.rmsd+' '+domains+' </p>')
				   			}
				   			else{
				   				$('#general_features').html('<p> We sent an e-mail for you with the complete results and the mutated 3D structure in PDB. <br /> <b>RMSD:</b> '+output.rmsd+' '+domains+' </p>')
				   			}
				   			
							/*if(output.table_stability.length > 0){
						   		$('#table_stability').DataTable( {
									data: output.table_stability,
									columns: [
										{ title: "Effect" },
										{ title: "Variable" },
										{ title: "Reference" },
										{ title: "Mutated" }
									]
								} );
							}*/
						}
						else{
							document.getElementById('results').innerHTML='<div class="col-md-12" > <br /> <div id="general_features"> </div> </div> ';
							$('#general_features').html('<p> We sent an e-mail for you with the details of the failed job. <br /> <b>Error:</b> '+output.error+' </p>')
						}
						
					} );
			   }
			});
		}
		else{
			$('#sec_info').hide();
			document.getElementById('struct_action').disabled=false;
			document.getElementById('struct_action').innerHTML="Submit";
		
			if(seq.startsWith(">")){
				bootbox.alert("Choose at least one protein to execute the query!");
			}
			if(caa!=seq.length){
				bootbox.alert("There are invalid characters in the sequence!");
			}
			if(seq==""){
				bootbox.alert("Put an amino acid sequence!");
			}
			if(seq.length < 1000 || seq.length > 1280){
				bootbox.alert("The sequence length must be greater than 1000 and less than 1280!");
			}
			if(email=='' && email.split("@").length!=2){
				bootbox.alert("Provide a valid email to receive the results!");
			}
		}
    },
    
 }
})();
