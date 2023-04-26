using {rtp as my} from '../db/schema';

@path: 'rtp'
service companies {
    entity CompanyCodes as projection on my.CompanyCodes;
    
    @odata.draft.enabled
    entity Companies   as projection on my.Companies;

    function FiscalYear(takenDate: DateTime) returns String;
}