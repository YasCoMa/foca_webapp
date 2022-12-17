<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

<!--Site baseado no temple free: https://startbootstrap.github.io/startbootstrap-sb-admin-2/index.html-->
    <title>LABINFO - Mutations FOreCasting Analysis (FOCA)</title>
	
   <?php include('../head_imports.php'); ?>
<!--<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAOtWDfqo4RS_jekYDvI5Rm4RxFsZ4NuiE"> </script>-->
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <?php include('../menu.php'); ?>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <!-- Sidebar Toggle (Topbar) -->
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>

                    <!-- Topbar Search -->
                    <form
                        class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search" style="display: none">
                        <div class="input-group">
                            <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..."
                                aria-label="Search" aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">
                                    <i class="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">

                        <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                        <li class="nav-item dropdown no-arrow d-sm-none">
                            <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-search fa-fw"></i>
                            </a>
                            <!-- Dropdown - Messages -->
                            <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown">
                                <form class="form-inline mr-auto w-100 navbar-search">
                                    <div class="input-group">
                                        <input type="text" class="form-control bg-light border-0 small"
                                            placeholder="Search for..." aria-label="Search"
                                            aria-describedby="basic-addon2">
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" type="button">
                                                <i class="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>

                    </ul>

                </nav>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">SARS Cov-2 Mutations Forecasting Analysis (FOCA)</h1>
                        <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                    </div>

                    <!-- Content Row -->
                    <div class="row">

                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1" >
                                                Weeks (last update)</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="sec1_last_update">68 (18-06-2021)</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <!-- Content Row -->

                    <div class="row">
                    	<div class="col-md-12">
							<h1 class="h3 mb-4 text-gray-800"> Brazilian States Analysis </h1>
							<p><b>Click on a state to see more information</b></p>
							<p><b>*Chart is showing the number of samples by state</b></p>
							 
							<div id="geo-container">
								<div id="map-area" style="width: 70%; float:left;">
									<div id="chart_div" ></div>
								</div>
								<div id="region-info"   style="float:right;width:30%;height:600px; visibility:hidden; padding-left: 10px;">
									<p> <b>Top five mutations in this state:</b> </p>
									<div class=" pt-4 pb-2" id="geo1_chart_container">
				                        <canvas id="geo1_mutation"></canvas>
				                    </div>
				                    
				                    <p> <b>Top five lineages in this state:</b> </p>
									<div class=" pt-4 pb-2" id="geo2_chart_container">
				                        <canvas id="geo2_lineage"></canvas>
				                    </div>
								</div>
							</div>
					
							<div class="clearfix"></div>
						
						 	<h1 class="h3 mb-4 text-gray-800" style="width: 100%"> Global Analysis </h1>
						 	<p><b>*All charts, except for the domains and missense mutations over time, show the top ten items retrieved in the search. You may download the complete data using the "Generate Report" button.</b></p>
						</div>
						
						<div class="col-xl-8 col-lg-7">
                            <div class="card shadow mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Domains with Highest Mutation Occurrrences by Protein </h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                	<!--<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bbbootstrap/libraries@main/choices.min.css">
									<script src="https://cdn.jsdelivr.net/gh/bbbootstrap/libraries@main/choices.min.js"></script>
									<div class="row d-flex justify-content-center mt-100">
										<div class="col-md-4"> 
											<label for="sec6_proteins">Proteins of interest (Max.: 4):</label> <br />
											<select class="select_filter" id="sec6_proteins" multiple data-max-options="4" data-live-search="true" >
												
											</select> 
										</div>
										
										<div class="col-md-4"> 
											<label for="sec6_location">Location:</label> <br />
											<select class="select_filter" id="sec6_locations" data-live-search="true" > </select> 
										</div>
										
										<div class="col-md-4"> 
											<label for="sec6_period">Period:</label> <br />
											<select class="form-control" id="sec6_period"  >
												<option value="weekly" > Weekly </option> 
												<option value="monthly" > Monthly </option> 
											</select> 
											
										</div>
										
										<div class="col-md-12" >
											<button type="button" class="btn btn-primary btn-rounded" id="sec6_action" onclick="foca_summary.get_domains_by_protein()" style="margin-left: 10px;">GO</button>
										</div>
									</div>-->
									
                                    <div class="chart-area" id="sec6_chart_container">
                                        <!--<canvas id="sec6_domains"></canvas>-->
                                    </div>
                                    
                                    <script>
                                    	function show_dom(){
                                    		if($('#dom')[0].style.display=="none"){
                                    			$('#dom').show()
                                    			$('#domi').html('Hide Domain Annotations')
                                    		}
                                    		else{
                                    			$('#dom').hide()
                                    			$('#domi').html('Show Domain Annotations')
                                    		}
                                    	}
                                    </script>
                                    <a href="javascript:void(0)" onclick="show_dom()" id="domi">Show Domain Annotations</a>
                                    <div id="dom" style="display: none">
		                                <div class="col-md-12" id="sec6_description"> </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        
                        <!-- Pie Chart -->
                        <div class="col-xl-4 col-lg-5">
                            <div class="card shadow mb-4">
                                <!-- Card Header - Dropdown -->
                                <div
                                    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Lineage counts by Mutations</h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                	<div class="form-outline">
									  <label for="sec3_mutations">Mutations of interest:</label>
									  <input type="text" id="sec3_mutations" class="form-control" value="Spike_D614G,NSP6_S106del" placeholder="Spike_D614G,NSP12_C5Y" />
									</div>
									
									<div class="form-outline">
									  <label for="sec3_hits">Minimum hits:</label>
									  <input type="number" id="sec3_hits" class="form-control" value="10" placeholder="1" />
									</div>
									
									<button type="button" class="btn btn-primary btn-rounded" id="sec3_action" onclick="foca_summary.get_lineages_by_count()">GO</button>
									
                                	<select class="form-control" style="display: none; margin-top: 10px;" id="sec3_options" onchange="foca_summary.change_lineages_by_count()"></select>
                                
                                    <div class=" pt-4 pb-2" id="sec3_chart_container">
                                        <canvas id="sec3_lineages_by_count"></canvas>
                                    </div>
                                    
                                    <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="file_export_sec3" ><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                                </div>
                            </div>
                        </div>
                    </div>

					<div class="row">

                        <!-- Area Chart -->
                        <div class="col-xl-10 col-lg-7">
                            <div class="card shadow mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary"> Forecasting of Mutations Mean </h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                	<div class="row d-flex justify-content-center mt-100">
										<div class="col-md-4"> 
											<label for="secf_proteins">Protein:</label> <br />
											<select class="select_filter" id="secf_proteins"  data-live-search="true" >
												
											</select> 
										</div>
										
										<div class="col-md-4"> 
											<label for="secf_location">Location:</label> <br />
											<select class="select_filter" id="secf_locations" data-live-search="true" > </select> 
										</div>
										
										<div class="col-md-12" >
											<button type="button" class="btn btn-primary btn-rounded" id="secf_action" onclick="foca_summary.get_forecasting()" style="margin-left: 10px;">GO</button>
										</div>
									</div>
									
                                    <div class="chart-area" id="secf_chart_container" style="display: none">
                                        <img src="" id="img_forecasting" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    <!-- Content Row -->
                    <div class="row">

                        <!-- Area Chart -->
                        <div class="col-xl-8 col-lg-7">
                            <div class="card shadow mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Mutations Missense Mean per Period (All variants) </h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bbbootstrap/libraries@main/choices.min.css">
									<script src="https://cdn.jsdelivr.net/gh/bbbootstrap/libraries@main/choices.min.js"></script>
									<div class="row d-flex justify-content-center mt-100">
										<div class="col-md-4"> 
											<label for="sec2_proteins">Proteins of interest (Max.: 4):</label> <br />
											<select class="select_filter" id="sec2_proteins" multiple data-max-options="4" data-live-search="true" >
												
											</select> 
										</div>
										
										<div class="col-md-4"> 
											<label for="sec2_location">Location:</label> <br />
											<select class="select_filter" id="sec2_locations" data-live-search="true" > </select> 
										</div>
										
										<div class="col-md-4"> 
											<label for="sec2_period">Period:</label> <br />
											<select class="form-control" id="sec2_period"  >
												<option value="weekly" > Weekly </option> 
												<option value="monthly" > Monthly </option> 
											</select> 
											
										</div>
										
										<div class="col-md-12" >
											<button type="button" class="btn btn-primary btn-rounded" id="sec2_action" onclick="foca_summary.get_missense_by_period()" style="margin-left: 10px;">GO</button>
										</div>
									</div>
									
                                    <div class="chart-area" id="sec2_chart_container">
                                        <canvas id="sec2_mutations"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Pie Chart -->
                        <div class="col-xl-4 col-lg-5">
                            <div class="card shadow mb-4">
                                <!-- Card Header - Dropdown -->
                                <div
                                    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Country counts by Mutations</h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                	<div class="form-outline">
									  <label for="sec5_mutations">Mutations of interest:</label>
									  <input type="text" id="sec5_mutations" class="form-control" value="Spike_D614G,NSP6_S106del" placeholder="Spike_D614G,NSP12_C5Y" />
									</div>
									
									<div class="form-outline">
									  <label for="sec5_hits">Minimum hits:</label>
									  <input type="number" id="sec5_hits" class="form-control" value="10" placeholder="1" />
									</div>
									
									<button type="button" class="btn btn-primary btn-rounded" id="sec5_action" onclick="foca_summary.get_countries_by_count()">GO</button>
									
                                	<select class="form-control" style="display: none; margin-top: 10px;" id="sec5_options" onchange="foca_summary.change_countries_by_count()"></select>
                                
                                    <div class=" pt-4 pb-2" id="sec5_chart_container">
                                        <canvas id="sec5_countries_by_count"></canvas>
                                    </div>
                                    
                                    <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="file_export_sec5" ><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                                </div>
                            </div>
                        </div>

					</div>

					<div class="row">
                        
                        

                        <!-- Pie Chart -->
                        <div class="col-xl-4 col-lg-5">
                            <div class="card shadow mb-4">
                                <!-- Card Header - Dropdown -->
                                <div
                                    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Mutation counts by Lineages</h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                	<div class="form-outline">
									  <label for="sec7_lineages">Lineage:</label>
									  <!--<input type="text" id="sec7_lineages" class="form-control"  value="B.1.1.7,P.1,B.1.351,B.1.617.2" placeholder="B.1.1.7,P.1" /> -->
									  <select class="form-control" id="sec7_lineages" data-live-search="true"  > </select>
									</div>
									
									<div class="form-outline">
									  <label for="sec7_hits">Minimum hits:</label>
									  <input type="number" id="sec7_hits" class="form-control" value="10" placeholder="1" />
									</div>
									
									<button type="button" class="btn btn-primary btn-rounded" id="sec7_action" onclick="foca_summary.get_mutations_by_count()">GO</button>
									
                                	<select class="form-control" style="display: none; margin-top: 10px;" id="sec7_options" onchange="foca_summary.change_mutations_by_count()"></select>
                                
                                    <div class=" pt-4 pb-2" id="sec7_chart_container">
                                        <canvas id="sec7_mutations_by_count"></canvas>
                                    </div>
                                    
                                    <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="file_export_sec7" ><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-xl-4 col-lg-5">
                            <div class="card shadow mb-4">
                                <!-- Card Header - Dropdown -->
                                <div
                                    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary"> Unique mutation counts by Lineages</h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                	<div class="form-outline">
									  <label for="sec8_lineages">Lineages of interest:</label>
									  <!--<input type="text" id="sec8_lineages" class="form-control" value="B.1.1.7,P.1,B.1.351,B.1.617.2" placeholder="B.1.1.7,P.1" />-->
									  <select class="form-control" id="sec8_lineages" data-live-search="true"  > </select>
									</div>
									
									<div class="form-outline">
									  <label for="sec8_hits">Minimum hits:</label>
									  <input type="number" id="sec8_hits" class="form-control" value="10" placeholder="1" />
									</div>
									
									<button type="button" class="btn btn-primary btn-rounded" id="sec8_action" onclick="foca_summary.get_unique_lineages_by_count()">GO</button>
									
                                	<select class="form-control" style="display: none; margin-top: 10px;" id="sec8_options" onchange="foca_summary.change_unique_lineages_by_count()"></select>
                                
                                    <div class=" pt-4 pb-2" id="sec8_chart_container">
                                        <canvas id="sec8_mutations_by_count"></canvas>
                                    </div>
                                    
                                    <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="file_export_sec8" ><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                                </div>
                            </div>
                        </div>
						
						<!--
						<div class="col-xl-4 col-lg-5">
                            <div class="card shadow mb-4">
                            
                                <div
                                    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary"> Mutations for peptide</h6>
                                </div>
                                
                                <div class="card-body">
                                	<div class="form-outline">
									  <label for="sec9_peptide">Peptide sequence:</label>
									  <input type="text" id="sec9_peptide" class="form-control" value="QGVNCTEVPVAIHADQLTPTWRV" placeholder="Min.: 9, Max.: 30 AAs" minlength="9" maxlength=30 />
									</div>
									
									<div class="form-outline">
									  <label for="sec9_protein">Protein:</label>
									  <select class="select_filter" id="sec9_protein" data-live-search="true" > </select> 
									</div>
									
									<button type="button" class="btn btn-primary btn-rounded" id="sec9_action" onclick="foca_summary.get_mutations_peptide()">GO</button>
									
									<p id="sec9_muts" style="margin-top: 10px;" ></p>
									
                                	<div class=" pt-4 pb-2" id="sec9_chart_container">
                                        <canvas id="sec9_mutations_by_count"></canvas>
                                    </div>
                                    
                                    <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="file_export_sec9" ><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                                </div>
                            </div>
                        </div>-->
                        
                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->
            
            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Laboratorio de Bioinformatica (LABINFO) / Laboratório Nacional de Computação Cientifica (LNCC) - Brasil - 2021</span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>
    
    <?php include('../foot_imports.php'); ?>
            
    <script >
    google.charts.load('current', {
			   'packages': ['geochart'],
			   // Note: Because markers require geocoding, you'll need a mapsApiKey.
			   // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
			   'mapsApiKey': 'AIzaSyAOtWDfqo4RS_jekYDvI5Rm4RxFsZ4NuiE'
			 });
			 google.charts.setOnLoadCallback(foca_summary.init);
    	//foca_summary.init();
    </script>

</body>

</html>
