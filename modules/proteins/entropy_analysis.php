<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Custom fonts for this template-->
    <title>LABINFO - Mutations FOreCasting Analysis (FOCA)</title>

    <!-- Custom fonts for this template-->
   <?php include('../head_imports.php'); ?>

</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar - Brand -->
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


                </nav>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <h1 class="h3 mb-4 text-gray-800">Entropy Analysis for protein Sequences of VOCs</h1>

                    <div class="row">

                        <div class="col-md-12">

                            <!-- Circle Buttons -->
                            <div class="card shadow mb-12">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Entropy Analysis with all samples</h6>
                                </div>
                                <div class="card-body">
                                    <div class="row d-flex justify-content-center mt-100">
										<div class="col-md-4"> 
											<label for="sec1_lineage">Lineage:</label> <br />
											<select class="form-control" id="sec1_lineage" value="B.1.617.2"  >
												<!--<option value="All" > All </option>-->
												<option value="P.1" > P.1 </option>
												<option value="B.1.1.7" > B.1.1.7 </option>
												<option value="B.1.351" > B.1.351 </option>
												<option value="B.1.617.2" selected  > B.1.617.2 </option>
											</select> 
											
										</div>
										
										<div class="col-md-4"> 
											<label for="sec1_proteins">Proteins of interest (Max.: 4):</label> <br />
											<select class="select_filter" id="sec1_proteins" multiple data-max-options="4" data-live-search="true" > </select> 
										</div>
										
										<div class="col-md-4"> 
											<label for="sec1_position">Position:</label> <br />
											<input type="number" class="form-control" min="1" max="5000" id="sec1_position" placeholder="All" />
										</div>
										
										<div class="col-md-4"> 
											<label for="sec1_effect">SNAP effect:</label> <br />
											<select class="form-control" id="sec1_effect" value="All" >
												<option value="All" > All </option>
												<option value="effect" > effect </option>
												<option value="neutral" > neutral </option>
											</select> 
										</div>
										
										<div class="col-md-4"> 
											<label for="sec1_count">Count (above):</label> <br />
											<input type="number" class="form-control" min="1" placeholder="1" value="1" id="sec1_count" />
										</div>
										
										<div class="col-md-4"> 
											<label for="sec1_proportion">Proportion (above):</label> <br />
											<input type="number" class="form-control" min="0" placeholder="1" value="0.2" id="sec1_proportion" />
										</div>
										
										<div class="col-md-12" >
											<button type="button" class="btn btn-primary btn-rounded" id="sec1_action" onclick="foca_entropy.get_entropy()" style="margin-left: 10px;">GO</button>
										</div>
									</div>
									
									<div class="row" id="results">
										<div class="col-md-12" > <table id="table_entropy" width="100%" > </table> </div>
									</div>
									
									<div class="row" >
										<div class="col-md-12" >
											<a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" style="display: none ;" id="file_export_sec1" ><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
										</div>
									</div>
									
                                </div>
                            </div>

						</div>

                    </div>
                    
                    <div class="row" style="margin-top: 20px;" >
                    
						<div class="col-xl-8 col-lg-7">
                            <div class="card shadow mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Top 3 positions with highest entropy in the last six months </h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                	<p> The chart shows the positions along with their respective proteins that had more changes of AA in each month, turning them high unpredictable. The absence of a position among the presented months indicate that it stabilized for one of the AA changes occurred before, which diminished its entropy. </p>
                                
                                	<div class="row d-flex justify-content-center mt-100">
										<div class="col-md-4"> 
											<label for="sec3_lineage">Lineage:</label> <br />
											<select class="form-control" id="sec3_lineage" value="P.1" >
												<!--<option value="All" > All </option>-->
												<option value="P.1" > P.1 </option>
												<option value="B.1.1.7" > B.1.1.7 </option>
												<option value="B.1.351" > B.1.351 </option>
												<option value="B.1.617.2" selected > B.1.617.2 </option>
											</select> 
										</div>
										
										<div class="col-md-4"> 
											<label for="sec3_location">Location:</label> <br />
											<select class="select_filter" id="sec3_location" data-live-search="true" > </select> 
										</div>
										
										<div class="col-md-12" >
											<button type="button" class="btn btn-primary btn-rounded" id="sec3_action" onclick="foca_entropy.get_plot_entropy()" style="margin-left: 10px;">GO</button>
										</div>
									</div>
									
                                    <div class="chart-area" id="sec_chart_container">
                                        <!--<canvas id="sec6_domains"></canvas>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-12">

                            <!-- Circle Buttons -->
                            <div class="card shadow mb-12">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Entropy Analysis by Period</h6>
                                </div>
                                <div class="card-body">
                                    <div class="row d-flex justify-content-center mt-100">
										<div class="col-md-4"> 
											<label for="sec2_lineage">Lineage:</label> <br />
											<select class="form-control" id="sec2_lineage" value="B.1.617.2" >
												<!--<option value="All" > All </option>-->
												<option value="P.1" > P.1 </option>
												<option value="B.1.1.7" > B.1.1.7 </option>
												<option value="B.1.351" > B.1.351 </option>
												<option value="B.1.617.2" selected > B.1.617.2 </option>
											</select> 
										</div>
										
										<div class="col-md-4"> 
											<label for="sec2_proteins">Proteins of interest (Max.: 4):</label> <br />
											<select class="select_filter" id="sec2_proteins" multiple data-max-options="4" data-live-search="true" > </select> 
										</div>
										
										<div class="col-md-4"> 
											<label for="sec2_position">Position:</label> <br />
											<input type="number" class="form-control" min="1" max="5000" id="sec2_position" placeholder="All" />
										</div>
										
										<div class="col-md-4"> 
											<label for="sec2_effect">SNAP effect:</label> <br />
											<select class="form-control" id="sec2_effect" value="All" >
												<option value="All" > All </option>
												<option value="effect" > effect </option>
												<option value="neutral" > neutral </option>
											</select> 
										</div>
										
										<div class="col-md-4"> 
											<label for="sec2_month">Month:</label> <br />
											<select class="form-control" id="sec2_month" value="All" >
												<option value="All" > All </option>
												<option value="1" > 1 </option>
												<option value="2" > 2 </option>
												<option value="3" > 3 </option>
												<option value="4" > 4 </option>
												<option value="5" > 5 </option>
												<option value="6" > 6 </option>
												<option value="7" > 7 </option>
												<option value="8" > 8 </option>
												<option value="9" > 9 </option>
												<option value="10" > 10 </option>
												<option value="11" > 11 </option>
												<option value="12" > 12 </option>
											</select> 
										</div>
										
										<div class="col-md-4"> 
											<label for="sec2_year">Year:</label> <br />
											<select class="form-control" id="sec2_year" value="All"  >
												<option value="All" > All </option>
												<option value="2020" > 2020 </option> 
												<option value="2021" > 2021 </option> 
											</select> 
										</div>
										
										<div class="col-md-12" >
											<button type="button" class="btn btn-primary btn-rounded" id="sec2_action" onclick="foca_entropy.get_entropy_by_period()" style="margin-left: 10px;">GO</button>
										</div>
									</div>
									
									<div class="row" id="results_period">
										<div class="col-md-12" > <table id="table_entropy_period" width="100%"  > </table> </div>
									</div>
									
									<div class="row" >
										<div class="col-md-12" >
											<a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" style="display: none ;" id="file_export_sec2" ><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
										</div>
									</div>
									
                                </div>
                            </div>

						</div>

                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->
            
            <?php include('../foot_imports.php'); ?>
            
            <script >
            	foca_entropy.init();
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

