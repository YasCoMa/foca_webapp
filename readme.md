# FOCA-APP

Web application for covid-19 samples metadata from GISAID, illustrating the use of the request functions provided by [FOCA-API](https://github.com/YasCoMa/foca_api.git)

## Summary
FOCA is a web application to analyze samples metadata from gisaid composed of four main components:
- The demography analysis allows the search on samples metadata information such as location, lineage, patient status, age and gender. Through data science techniques\citep{van2016data} of data pre-processing, cleaning and quality evaluation, this component provides constantly updated visualization of pairwise combinations from these features. Currently, four dimensions can be analyzed in a combined mode: gender, age group~(child/adolescent, adult and elderly), VOCs, and patient status~(mild/alive, hospitalized and deceased). This component interacts with the user mainly across a world map showing the countries that have patient status information and then after user's selection if shows the amount of samples inside each of the VOCs, and the other previously described dimensions.

- The descriptive analysis for protein sequences offers summarized information to filter information related to mutations and their relationship with lineages, location~(countries), mean of mutations over time. These compare the trend for up to four proteins weekly or monthly. We also compute the domains where occurred more concentration of mutations grouped by the respective protein. This component returns a bar plot for each relationship ordered by samples count and normalizing by the proportion. Besides enables the user download the report with counts and proportion. Some of the dimensions integrated are distribution of lineages or countries by mutations, given a lineage it returns all mutations or their unique mutations. Finally, the last function of this component performs a forecasting analysis of the time series information of protein mutations mean over time, returning an insight about the possible pattern that these mutations in a certain protein may assume in the next three months. This component also has a specific area to analyze the top ten mutations of each Brazilian state, interacting with the user through a map of Brazil.

- The structural and functional analysis performs a pipeline, using a spike protein sequence submitted by the user, containing three modules. The first  aligns the user's sequence with the reference sequence, models the Spike 3D structure according to the mutations using [FoldX](https://foldxsuite.crg.eu/academic-license-info);, evaluates the structure quality using Ramachandran plot and RMSD~(Root Mean Square Deviation) quantification. The second module reports the amino acid group change, the mutations and the functional impact and its quantification prediction provided by the [SNAP2](https://github.com/Rostlab/SNAP2) tool. The third and last module runs stability analysis ([PredictProperty](https://github.com/realbigws/Predict_Property)) and reports the energy parameters focusing on measure the differences in each parameter values, adding a decision column assigning the states increase, decrease and same for easy and fast analysis. All these results are sent by e-mail to the user, and also reported in FOCA in a maximum of ten minutes. The protein molecule is show with the mutated atoms highlighted in blue for easy identification of their locations in the structure.

- The VOCs entropy analysis evaluates the uncertainty of an amino acid in each position of the SARS-CoV-2 proteins, measuring positions of interest that have more potential of future mutations. This component presents a table considering all samples in the database, not partitioning by time period. The other table is derived calculating the entropy by month. Using the data by month, we show a plot containing the top three positions with respective proteins that have the highest entropy values in the last six months. This analysis allows the monitoring of specific proteins positions that are being adjusted and may cause a functional impact

## Requirements:
* In the modules/foot_imports.php, change the content of the variable host to the ip address and port where you are serving the FOCA-API.

## Usage Instructions
* See and interact with FOCA-APP:
	1. ````git clone https://github.com/YasCoMa/foca_webapp.git````
	2. ````cd foca_webapp````
	3. Just open the index.php file in a browser!

