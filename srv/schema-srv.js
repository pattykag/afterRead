const cds = require('@sap/cds');

module.exports = cds.service.impl(async (srv) => {
    const { Companies } = srv.entities;

    // srv.before('READ', Companies, async () => {
    //     let aCompanies = await SELECT.from(Companies);
    //     //console.log('aCompanies', aCompanies);

    //     aCompanies.forEach(async (element) => {
    //         if (element.CompanyCodeOne_CompanyCode === element.CompanyCodeTwo_CompanyCode && element.equalCoCo === false) {
    //             console.log(element.equalCoCo);
    //             await UPDATE(Companies).where({ ID: element.ID }).with({ equalCoCo: true });
    //         } else if (element.CompanyCodeOne_CompanyCode !== element.CompanyCodeTwo_CompanyCode && element.equalCoCo === true) {
    //             console.log(element.equalCoCo);
    //             await UPDATE(Companies).where({ ID: element.ID }).with({ equalCoCo: false });
    //         }
    //     });
    // });
    // srv.on('READ', Companies, (req) => {
    //     const [TrasanctionDate] = req.params
    //     console.log(TrasanctionDate)
    // })
    // El fiori elements actualiza más lento, esto se hace para que la info ahí se muestre correctamente
    srv.after('READ', Companies, async (data, req) => {
        try {
            const { where } = req.query.SELECT;
            let bFlag = false;
            let aDate = [];

            if (where) {
                //console.log(where);
                where.forEach(element => {
                    // verifico que esté posicionado en ref
                    if (bFlag === false && element.ref) {
                        // verifico que exista el filtro TrasanctionDate
                        if (element.ref[0] === 'TrasanctionDate') {
                            //console.log('REF', element.ref[0]);
                            bFlag = true;
                        }
                        // si existe TrasanctionDate bFlag = true. Guardo el valor en el array
                    } else if (bFlag === true && element.val) {
                        //console.log(element.val);
                        aDate.push(element.val);
                        bFlag = false;
                    }
                });
            }
            console.log('Length aDate', aDate.length);
            console.log(aDate);
            if (aDate[0] === aDate[1]) {
                console.log('Son iguales');
            } else {
                FiscalYear(aDate[0], aDate[1]);
            }

            // let a = [];
            // let b = {};
            // let c;
            // let nRef = req.query.SELECT.where;
            // console.log(nRef);

            // nRef.forEach(element => {
            //     //console.log('Element', element);
            //     if (element) {
            //         console.log(element.length);
            //         console.log('entró', element);
            //     //     c = element.ref;
            //     //     console.log(c);
            //     // } else if (element.val) {
            //     //     b = {c : element.val}
            //     }
            // });

            // console.log(a);
            // console.log(b);

            //console.log('Lenght', data.length);
            data.forEach(async (element) => {
                if (element.CompanyCodeOne_CompanyCode === element.CompanyCodeTwo_CompanyCode && element.equalCoCo === false) {
                    element.equalCoCo = true;
                } else if (element.CompanyCodeOne_CompanyCode !== element.CompanyCodeTwo_CompanyCode && element.equalCoCo === true) {
                    element.equalCoCo = false;
                }
            });

            //console.log(data[0].TrasanctionDate);
        } catch (error) {
            console.log(error);
            req.info(204, 'No data');
        }

        // data = data.filter(d => d.CompanyCodeOne_CompanyCode !== d.CompanyCodeTwo_CompanyCode);
        // console.log(data);
    });

    srv.on('FiscalYear', async (req) => {
        let fiscalyear = "";
        //let today = new Date();
        let chosenDate = req.data.chosenDate;
        chosenDate = new Date(chosenDate);
        //chosenDate = new Date(chosenDate).toDateString();

        // formato FiscalYear(chosenDate=2023-04-21T19:22:03.342Z) 2023-04-21T19:22:03.342Z
        //console.log(chosenDate.getMonth());

        let month = chosenDate.getMonth() + 1;
        let year = chosenDate.getFullYear();
        console.log(`Mes ${month} año ${year}`);

        //if (chosenDate.getMonth() +1)

        if ((chosenDate.getMonth() + 1) <= 8) {
            fiscalyear = (chosenDate.getFullYear() - 1) + "-" + chosenDate.getFullYear()
        } else {
            fiscalyear = chosenDate.getFullYear() + "-" + (chosenDate.getFullYear() + 1)
        }
        return fiscalyear
        //return `Mes ${month} año ${year}`
    });

});

// const FiscalYear = () => {

// }

const FiscalYear = (fromDate, toDate) => {
    let fiscalyear = "";
    //let today = new Date();
    let chosenDate = req.data.chosenDate;
    chosenDate = new Date(chosenDate);
    //chosenDate = new Date(chosenDate).toDateString();

    // formato FiscalYear(chosenDate=2023-04-21T19:22:03.342Z) 2023-04-21T19:22:03.342Z
    //console.log(chosenDate.getMonth());

    let month = chosenDate.getMonth() + 1;
    let year = chosenDate.getFullYear();
    console.log(`Mes ${month} año ${year}`);

    //if (chosenDate.getMonth() +1)

    if ((chosenDate.getMonth() + 1) <= 8) {
        fiscalyear = (chosenDate.getFullYear() - 1) + "-" + chosenDate.getFullYear()
    } else {
        fiscalyear = chosenDate.getFullYear() + "-" + (chosenDate.getFullYear() + 1)
    }
    return fiscalyear
    //return `Mes ${month} año ${year}`
}