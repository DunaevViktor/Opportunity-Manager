@IsTest
public with sharing class ContactRoleControllerTest {

    private static String CONTACT_ID = '01s2y000000wTxMAAU';
    private static String INVALID_ROLE = 'The expected role is not null.';
    private static String INVALID_AMOUNT = 'The expected value is not 0.';

    @IsTest
    static void createRoleTest() {
        OpportunityContactRole role = ContactRoleController.createRole();
        System.assertNotEquals(null, role, INVALID_ROLE);

        List<OpportunityContactRole> roles = [SELECT Id FROM OpportunityContactRole];
        System.assertEquals(0, roles.size(), INVALID_AMOUNT);
    }

    @IsTest
    static void createListRolesTest() {
        List<OpportunityContactRole> roles = ContactRoleController.createListRoles();
        System.assertEquals(0, roles.size(), INVALID_AMOUNT);        
    }

    @IsTest
    static void getAllContactsTest(){
        List<Contact> con = ContactRoleController.getAllContacts(CONTACT_ID);
        System.assertEquals(0, con.size(), INVALID_AMOUNT);
    }

    @IsTest
    static void getPickListTest(){
        List<String> picklist = ContactRoleController.getPickList();
        //If the admin somehow changes the picklist "Role "values of the object "Opportunity Contact Role",
        //then there will be an error.
        System.assertEquals(9, picklist.size(), INVALID_AMOUNT);
    }
}