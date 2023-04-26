using {cuid} from '@sap/cds/common';

namespace rtp;

entity Companies : cuid {
    CompanyCodeOne  : Association to CompanyCodes;
    CompanyCodeTwo  : Association to CompanyCodes;
    FiscalYearInit  : Date;
    FiscalYearEnd   : Date;
    TrasanctionDate : Date;
    Wbs             : Association to Wbs;
    equalCoCo       : Boolean;
}

entity CompanyCodes {
    key CompanyCode : String(4);
}

entity Wbs {
    key Wbs : String(8);
}
