using companies as service from '../../srv/schema-srv';

annotate rtp.Companies with {
    CompanyCodeOne  @title: '{i18n>CompanyCodeOne}';
    CompanyCodeTwo  @title: '{i18n>CompanyCodeTwo}';
    // FiscalYearInit @title: '{i18n>FiscalYearInit}';
    // FiscalYearEnd  @title: '{i18n>FiscalYearEnd}';
    Wbs             @title: '{i18n>Wbs}';
    TrasanctionDate @title: '{i18n>TrasanctionDate}';
    equalCoCo       @title: 'Same Company'
};


annotate rtp.Companies with @(UI: {
    HeaderInfo     : {
        TypeName      : '{i18n>titleS}',
        TypeNamePlural: '{i18n>titleS}'
    },
    //SelectionFields: [TrasanctionDate],
    LineItem       : [
        {Value: CompanyCodeOne_CompanyCode},
        {Value: CompanyCodeTwo_CompanyCode},
        {Value: TrasanctionDate},
        // {Value: FiscalYearInit},
        // {Value: FiscalYearEnd},
        {Value: Wbs_Wbs},
        {Value: equalCoCo}
    ],
});

// Enabling Date Picker
// Put this inside the manifest
// https://sapui5.hana.ondemand.com/#/topic/fef65d03d01a4b2baca28983a5449cf7
annotate rtp.Companies with @Capabilities: {FilterRestrictions: {
    $Type                       : 'Capabilities.FilterRestrictionsType',
    FilterExpressionRestrictions: [{
        Property          : 'TrasanctionDate',
        AllowedExpressions: 'SingleRange'
    }]
}};
// Default Filter - > TODAY
// annotate rtp.Companies with {
//     @Common.FilterDefaultValue : 'TODAY'
//     FiscalYearInit
// };
