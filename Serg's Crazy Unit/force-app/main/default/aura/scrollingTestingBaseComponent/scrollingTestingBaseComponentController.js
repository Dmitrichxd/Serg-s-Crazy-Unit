({
    doInit: function (component, event, helper) {

        let recordType = component.get("v.recordType");
        let totalCount = component.get("c.getTotalCount");
        totalCount.setParams({
            "recordType": recordType
        });
        totalCount.setCallback(this, function (response) {
            component.set("v.totalNumberOfRows", response.getReturnValue());
        });
        $A.enqueueAction(totalCount);

        if (recordType == "Account") {
            component.set("v.columns", [
                { label: "Id", fieldName: "Id", type: "Id" },
                { label: "Name", fieldName: "Name", type: "text", sortable: true },
                { label: "Billing City", fieldName: "BillingCity", type: "text", sortable: true },
                { label: "Billing State", fieldName: "BillingState", type: "text", sortable: true },
                { label: "Account Number", fieldName: "AccountNumber", type: "number", sortable: true, cellAttributes: { alignment: 'center' }, initialWidth: 100 },
            ]);
        } else if (recordType == "Contact") {
            component.set("v.columns", [
                { label: "Id", fieldName: "Id", type: "Id" },
                { label: "Name", fieldName: "Name", type: "text", sortable: true },
                { label: "Phone", fieldName: "Phone", type: "phone" },
                { label: "Email", fieldName: "Email", type: "email", sortable: true },
            ]);
        }
        helper.getData(component, recordType);
    },

    updateColumnSorting: function (component, event, helper) {
        var fieldName = event.getParam("fieldName");
        var sortDirection = event.getParam("sortDirection");
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortDirection);
        helper.sortData(component, fieldName, sortDirection);
    },

    loadMoreData: function (component, event, helper) {
        event.getSource().set("v.isLoading", true);
        component.set("v.loadMoreStatus", "Loading");
        helper.fetchData(component).then($A.getCallback(function (data) {
            if (component.get("v.data").length >= component.get("v.totalNumberOfRows")) {
                component.set("v.enableInfiniteLoading", false);
                component.set("v.loadMoreStatus", "No more data to load");
            } else {
                var currentData = component.get("v.data");
                var newData = currentData.concat(data);
                component.set("v.data", newData);
                component.set("v.loadMoreStatus", "Please wait ");
            }
            event.getSource().set("v.isLoading", false);
        }));
    },
})