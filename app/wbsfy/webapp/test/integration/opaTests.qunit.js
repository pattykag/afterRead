sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'fy/wbsfy/test/integration/FirstJourney',
		'fy/wbsfy/test/integration/pages/CompaniesList',
		'fy/wbsfy/test/integration/pages/CompaniesObjectPage'
    ],
    function(JourneyRunner, opaJourney, CompaniesList, CompaniesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('fy/wbsfy') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCompaniesList: CompaniesList,
					onTheCompaniesObjectPage: CompaniesObjectPage
                }
            },
            opaJourney.run
        );
    }
);