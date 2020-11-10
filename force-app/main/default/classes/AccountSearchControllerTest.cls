@IsTest
public with sharing class AccountSearchControllerTest {

    private static String ACCOUNT_NAME = 'Test Name';
    private static String INVALID_NAME = 'Actual account name does not equal to expected.';
    private static String INVALID_AMOUNT = 'Actual accounts amount does not equal to expected.';

    @IsTest
    static void getAllAccountsTest(){
        List<Account> accounts = AccountSearchController.getAllAccounts();
        System.assertEquals(0, accounts.size(), INVALID_AMOUNT);
    }

    @IsTest
    static void searchAccountsTest() {
        Account account = new Account(Name = ACCOUNT_NAME);
        insert account;

        Id[] fixedSearchResults= new Id[1];
        fixedSearchResults[0] = account.Id;
        Test.setFixedSearchResults(fixedSearchResults);

        List<Account> accounts = AccountSearchController.searchAccounts(ACCOUNT_NAME);
        System.assertEquals(1, accounts.size(), INVALID_AMOUNT);
    }
}