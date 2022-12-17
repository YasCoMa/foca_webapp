<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Custom fonts for this template-->
    <title>Mutations FOreCasting Analysis (FOCA)</title>

    <!-- Custom fonts for this template-->
   <?php include('modules/head_imports.php'); ?>
	<!--<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAOtWDfqo4RS_jekYDvI5Rm4RxFsZ4NuiE"> </script>-->
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	
</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
    <script type="text/javascript">
        
        $(document).ready(function(e) {
            $('#Menu').load('modules/menu.php');
        });
        
    </script>
    
    <div id="Menu"></div>

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
                    <h1 class="h3 mb-4 text-gray-800"> Samples Metadata Analysis </h1>
					
					<h1 class="h3 mb-4 text-gray-800"> Global Analysis </h1>
					<p><b>Click on a country to see more information</b></p>
					<p><b>*Chart is showing the number of samples by country with information of patient status</b></p>
					 
					<div id="geo-container">
						<div id="map-area" style="width: 70%; float:left;">
							<div id="chart_div" ></div>
						</div>
						<div id="region-info"   style="float:right;width:30%;height:600px;visibility:hidden; padding-left: 10px;"></div>
					</div>
					
					<div class="clearfix"></div>
					
					<h1 class="h3 mb-4 text-gray-800"> Forecasting of Mutations Mean for Genome </h1>
					<div class="row">

                        <!-- Area Chart -->
                        <div class="col-xl-10 col-lg-7">
                            <div class="card shadow mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary"> Forecasting of Mutations Mean for the next three months</h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                	<div class="row d-flex justify-content-center mt-100">
										
										<div class="col-md-4"> 
											<label for="secf_location">Location by country:</label> <br />
											<select class="select_filter" id="secf_locations" data-live-search="true" > </select> 
										</div>
										
										<div class="col-md-12" >
											<button type="button" class="btn btn-primary btn-rounded" id="secf_action" onclick="foca_demography.get_forecasting()" style="margin-left: 10px;">GO</button>
										</div>
									</div>
									
                                    <div class="chart-area" id="secf_chart_container" style="display: none">
                                        <img src="" id="img_forecasting" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
					<div class="clearfix"></div>
					
					<h1 class="h3 mb-4 text-gray-800"> Brazilian Samples Analysis </h1>
                    <div class="row">

						<!-- Plots -->
							<div class="col-xl-5 col-md-5 col-lg-5">
		                        <div class="card shadow mb-6">
		                            <!-- Card Header - Dropdown -->
		                            <div
		                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
		                                <h6 class="m-0 font-weight-bold text-primary">Distribution of Genders by Age</h6>
		                            </div>
		                            <!-- Card Body -->
		                            <div class="card-body">
		                            	
		                            	<div class=" pt-4 pb-2" id="sec1_chart_container">
		                                    <canvas id="genders_age"></canvas>
		                                </div>
		                                
		                            </div>
		                        </div>
		                    </div>
		                    
		                    <div class="col-xl-5 col-md-5 col-lg-5">
		                        <div class="card shadow mb-6">
		                            <!-- Card Header - Dropdown -->
		                            <div
		                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
		                                <h6 class="m-0 font-weight-bold text-primary">Distribution of Genders by VOCs</h6>
		                            </div>
		                            <!-- Card Body -->
		                            <div class="card-body">
		                            	
		                            	<div class=" pt-4 pb-2" id="sec2_chart_container">
		                                    <canvas id="genders_voc"></canvas>
		                                </div>
		                                
		                            </div>
		                        </div>
		                    </div>
							
							<div class="col-xl-5 col-lg-5">
		                        <div class="card shadow mb-8">
		                            <!-- Card Header - Dropdown -->
		                            <div
		                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
		                                <h6 class="m-0 font-weight-bold text-primary">Distribution of Genders by Patient Status</h6>
		                            </div>
		                            <!-- Card Body -->
		                            <div class="card-body">
		                            	
		                            	<div class=" pt-4 pb-2" id="sec3_chart_container">
		                                    <canvas id="genders_status"></canvas>
		                                </div>
		                                
		                            </div>
		                        </div>
		                    </div>
							
							<div class="col-xl-5 col-lg-5">
		                        <div class="card shadow mb-8">
		                            <!-- Card Header - Dropdown -->
		                            <div
		                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
		                                <h6 class="m-0 font-weight-bold text-primary">Distribution of Ages by VOCs</h6>
		                            </div>
		                            <!-- Card Body -->
		                            <div class="card-body">
		                            	
		                            	<div class=" pt-4 pb-2" id="sec4_chart_container">
		                                    <canvas id="ages_vocs"></canvas>
		                                </div>
		                                
		                            </div>
		                        </div>
		                    </div>
							
							<div class="col-xl-5 col-lg-5">
		                        <div class="card shadow mb-8">
		                            <!-- Card Header - Dropdown -->
		                            <div
		                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
		                                <h6 class="m-0 font-weight-bold text-primary">Distribution of Ages by Patient Status</h6>
		                            </div>
		                            <!-- Card Body -->
		                            <div class="card-body">
		                            	
		                            	<div class=" pt-4 pb-2" id="sec5_chart_container">
		                                    <canvas id="ages_status"></canvas>
		                                </div>
		                                
		                            </div>
		                        </div>
		                    </div>
							
							<div class="col-xl-5 col-lg-5">
		                        <div class="card shadow mb-8">
		                            <!-- Card Header - Dropdown -->
		                            <div
		                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
		                                <h6 class="m-0 font-weight-bold text-primary">Distribution of Patient Status by VOCs</h6>
		                            </div>
		                            <!-- Card Body -->
		                            <div class="card-body">
		                            	
		                            	<div class=" pt-4 pb-2" id="sec6_chart_container">
		                                    <canvas id="status_vocs"></canvas>
		                                </div>
		                                
		                            </div>
		                        </div>
		                    </div>
						
						<div class="col-md-12">
                        
                            <!-- Table  -->
                            <!--<div class="card shadow mb-12">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Demographic Information of Samples</h6>
                                </div>
                                <div class="card-body">
                                    <div class="row d-flex justify-content-center mt-100">
										<div class="col-md-2"> 
											<label for="sec1_lineages">Lineage:</label> <br />
											<select class="form-control" id="sec1_lineages" data-live-search="true"  > </select> 
										</div>
										
										<div class="col-md-2"> 
											<label for="sec1_locations">Location:</label> <br />
											<select class="form-control" id="sec1_locations" data-live-search="true"  > </select> 
										</div>
										
										<div class="col-md-2"> 
											<label for="sec1_status">Patient Status:</label> <br />
											<select class="form-control" id="sec1_status" data-live-search="true"  > </select> 
										</div>
										
										<div class="col-md-2"> 
											<label for="sec1_gender">Gender:</label> <br />
											<select class="form-control" id="sec1_gender" value="All" >
												<option value="All" > All </option>
												<option value="Male" > Male </option>
												<option value="Female" > Female </option>
											</select> 
										</div>
										
										<div class="col-md-2"> 
											<label for="sec1_age">Age (above):</label> <br />
											<input type="number" class="form-control" min="0" max="105" id="sec1_age" placeholder="All" />
										</div>
										
										<div class="col-md-12" >
											<button type="button" class="btn btn-primary btn-rounded" id="sec1_action" onclick="foca_demography.get_table()" style="margin-left: 10px;">GO</button>
										</div>
									</div>
									
									<div class="row" id="results">
										<div class="col-md-12" > <table id="table_demography" width="100%" > </table> </div>
									</div>
									
									<div class="row" >
										<div class="col-md-12" >
											<a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" style="display: none ;" id="file_export_sec1" ><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
										</div>
									</div>
									
                                </div>
                            </div>-->
                        
						</div>
                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->
            
            <?php include('modules/foot_imports.php'); ?>
            
            <script >
            google.charts.load('current', {
			   'packages': ['geochart'],
			   // Note: Because markers require geocoding, you'll need a mapsApiKey.
			   // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
			   'mapsApiKey': 'AIzaSyAOtWDfqo4RS_jekYDvI5Rm4RxFsZ4NuiE'
			 });
			 google.charts.setOnLoadCallback(foca_demography.init);
            	//foca_demography.init();
            </script>
   	
            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2020</span>
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
    
    

</body>

</html>

