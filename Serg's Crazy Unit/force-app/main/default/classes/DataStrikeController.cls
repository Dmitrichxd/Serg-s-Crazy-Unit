public with sharing class DataStrikeController {
	@AuraEnabled
	public static List<Contact> getContacts(List<String> columns) {
        String soqlQuery = String.join(columns, ', ');
		return Database.query('SELECT ' + soqlQuery + ' FROM Contact');
	}

	@AuraEnabled
	public static Map<String, String> getColumnsAndTypes(List<String> columns) {
		SObjectType contactType = Schema.getGlobalDescribe().get('Contact');
		Map<String, Schema.SObjectField> fields = contactType.getDescribe().fields.getMap();
		Map<String, String> existingColumnsAndTypes = new Map<String, String>();
		for (String col :columns) {
			if(fields.containsKey(col)) {
				Schema.DisplayType dataType = Schema.getGlobalDescribe().get('Contact').getDescribe().fields
				.getMap().get(col).getDescribe().getType();
				existingColumnsAndTypes.put(col, String.valueOf(dataType));
			}
		}
		System.debug(existingColumnsAndTypes);
		return existingColumnsAndTypes;
	}

}