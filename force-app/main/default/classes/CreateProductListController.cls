public with sharing class CreateProductListController {
    
    @AuraEnabled
    public static OpportunityLineItem createProduct() {
        return new OpportunityLineItem();
    }

    @AuraEnabled
    public static List<OpportunityLineItem> createListProducts() {
        return new List<OpportunityLineItem>();
    }

    @AuraEnabled
    public static List<PricebookEntry> getAllProducts(String priceBookId){
        return [SELECT Id, Product2.Id, Product2.Name, ProductCode, UnitPrice 
                FROM PricebookEntry
                WHERE Pricebook2Id IN (SELECT Id FROM PriceBook2 WHERE Id = :priceBookId)
                ORDER BY Product2.Name ASC];
    }
}