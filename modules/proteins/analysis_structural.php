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
                    <h1 class="h3 mb-4 text-gray-800">Spike Functional & Structural analysis</h1>

                    <div class="row">

                        <div class="col-md-12">

                            <!-- Circle Buttons -->
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Spike Sequence Analysis</h6>
                                </div>
                                <div class="card-body">
                                    <p>Paste SARS-CoV-2 Spike sequence <span style="color: #DE6038">(only one spike amino acid sequence without the sequence identifier)</span> </p>
                                    <p>The following analysis will be performed: Alignment with reference Spike protein, Functional effects of each mutation, Mutations modelling in the reference structure, RMSD estimation and Stability comparison.</p>
                                    <div class="form-group">
    									<label for="seq">Sequence:</label>
    									<textarea class="form-control" id="seq" rows="8"></textarea>
  									</div>
  									
  									<div class="form-group">
    									<label for="email">E-mail:</label>
    									<input type="email" class="form-control" id="email" />
  									</div>
  									
  									<button class="btn btn-primary mb-2" onclick="foca_structural.execute_struct_effect()" id="struct_action" >Submit</button>
                                </div>
                            </div>


                        </div>

						<div class="col-md-12" id="sec_info" style="display: none"> 
							<p> Job submitted! The results will appear in less than ten minutes. </p>
						</div>

						<div class="col-md-12"  id="sec_struct" style="display: none" >
							<h3>Structure with mutations highlighted in blue: </h3>
							
							<div  style="display: flex; justify-content: center;" >
								<script src="../../js/jmol/jsmol/JSmol.min.js" ></script>
								<script src="../../js/jmol/jsmol/js/Jmol2.js" ></script>
								<script>
									jmolInitialize("../../js/jmol/jsmol");
									jmolApplet(500, "load /foca/modules/proteins/Spike.pdb; ", "0");
								</script>
								
								<div id='radio' style="display: none;"> </div>
							</div>
						</div>

						<div class="col-md-12" id="sec_result" style="display: none">
							<h3>Results: </h3>
							
							<div class="row" id="results">
								<div class="col-md-12" id="general_features"></div>
								
								<div class="col-md-12" > <table id="table_mutations" width="100%" > </table> </div>
								
								<div class="col-md-12" > <table id="table_stability" width="100%"  > </table> </div>
							</div>
							
							<a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" style="display: none;" id="file_export_sec" ><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
						</div>

                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

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
    
    <?php include('../foot_imports.php'); ?>
    

</body>

</html>

