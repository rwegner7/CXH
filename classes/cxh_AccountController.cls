
public with sharing class cxh_AccountController {

    @AuraEnabled
    public Account account;

    @AuraEnabled
    public String fileId;

    @AuraEnabled
    public static cxh_AccountController findAccount(String accountId){

        accountId = '0011I000007vqaMQAQ';

        cxh_AccountController ac = new cxh_AccountController();

        ac.account = new Account();
        ac.fileId = '';

        List<Account> accs = [SELECT Id, Name, Customer_ID__c, BillingStreet, BillingCity, BillingState, BillingCountry,
                County__c, BillingPostalCode, Phone, Website, Type, Description,
                (SELECT FirstName, LastName FROM Contacts) FROM Account
                WHERE Id =:accountId LIMIT 1];

        ac.account = accs[0] == null ? ac.account : accs[0];

        if(accs[0] != null){
            List<ContentDocumentLink> contentDocumentLinks = [SELECT ContentDocumentId, Id, IsDeleted, LinkedEntityId, ShareType, Visibility from ContentDocumentLink Where LinkedEntityId =: ac.account.Id AND IsDeleted = false LIMIT 1];
            if(contentDocumentLinks.size() > 0) ac.fileId = contentDocumentLinks[0].ContentDocumentId;
        }

        return ac;

    }

    @AuraEnabled
    public static void updateAccount(Account record){
        try{
            update record;
        }catch(DmlException e){
            System.debug('DML Error: ' + e.getMessage() + e.getCause());
        }
    }

}