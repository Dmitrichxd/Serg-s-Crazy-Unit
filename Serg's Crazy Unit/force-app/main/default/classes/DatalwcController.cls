public with sharing class DatalwcController {
	@AuraEnabled
	public static List<String> getAllObjects() {
		List<String> objectList = new List<String>();
			for(Schema.SObjectType objTyp :Schema.getGlobalDescribe().Values()) {
				if (objTyp.getDescribe().isAccessible()) {
				objectList.add(objTyp.getDescribe().getName());
				}
			}
		return objectList;
    }
    
    @AuraEnabled
	public static List<String> getAllFields(String selectedObject) {
		List<String> fieldsList = new List<String>();
        if (!String.isEmpty(selectedObject)) {
        for(Schema.SObjectField sfield :Schema.getGlobalDescribe().get(selectedObject)
                                        .getDescribe().fields.getMap().Values()) {
            Schema.DescribeFieldResult dfield = sfield.getDescribe();  
            fieldsList.add(dfield.getLabel());
		}
		return fieldsList;
		} else {
            return null;
        }
	}

	@AuraEnabled
    public static Map<String, String> getColumnsAndTypeslwc(String columns, 
                                                            String selectedObject) {
		SObjectType objectType = Schema.getGlobalDescribe().get(selectedObject);
		Map<String, Schema.SObjectField> fields = objectType.getDescribe().fields.getMap();
		Map<String, String> existingColumnsAndTypes = new Map<String, String>();
		List<String> columnsList = columns.split(',');
		for (String col :columnsList) {
			col = col.trim();
			for (Schema.SObjectField fieldLabel : fields.Values()) {
				if (fieldLabel.getDescribe().getLabel() == col) {
						Schema.DisplayType dataType = fieldLabel.getDescribe().getType();
						String fieldName = fieldLabel.getDescribe().getName();
						existingColumnsAndTypes.put(fieldName, String.valueOf(dataType));
				}
			}
		}
		System.debug(existingColumnsAndTypes);
		return existingColumnsAndTypes;
	}

	@AuraEnabled
    public static List<Object> getSelectedFields(String columns, 
                                             String selectedObject) {
		return Database.query('SELECT ' + columns + ' FROM ' + selectedObject + ' LIMIT 50000');
	}
}
