public with sharing class DataController {
	@AuraEnabled
	public static Integer getTotalCount(String recordType) {
		if(String.isEmpty(recordType)) {
			return 0;
		} else {
			switch on recordType {
				when 'Account' {
					return [SELECT Count() FROM Account];
				}
				when 'Contact' {
					return [SELECT Count() FROM Contact];
				}
				when else {
					return 0;
				}
			}
		}
	}

	@AuraEnabled
	public static List<Account> getAccounts(
                                    Integer limits, 
                                    Integer offsets, 
                                    String recordType) 
    {
		Integer intLimits = integer.valueof(limits);
		Integer intOffsets = integer.valueof(offsets);
		List<Account> accounts = [SELECT id, Name, BillingCity, BillingState, AccountNumber
							      FROM Account
							      ORDER BY Name
							      LIMIT :intLimits
							      OFFSET :intOffsets];
		return accounts;
	}

	@AuraEnabled
    public static List<Contact> getContacts(
                                    Integer limits, 
                                    Integer offsets, 
                                    String recordType) 
    {
		Integer intLimits = integer.valueof(limits);
		Integer intOffsets = integer.valueof(offsets);
		List<Contact> contacts = [SELECT id, Name, Email, Phone
							      FROM Contact
							      ORDER BY Name
							      LIMIT :intLimits
							      OFFSET :intOffsets];
		return contacts;
	}
}