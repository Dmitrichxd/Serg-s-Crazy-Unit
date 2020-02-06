({
    getData: function (component, recordType) {
        if (recordType == "Account") {
            let action = component.get("c.getAccounts");
            action.setParams({
                "limits": component.get("v.initialRows"),
                "offsets": component.get("v.rowNumberOffset"),
                "recordType": recordType
            });
            action.setCallback(this, function (response) {
                component.set("v.data", response.getReturnValue());
                component.set("v.currentOffsetCount", component.get("v.initialRows"));
                component.set("v.dataLength", component.get("v.data").length);
            });
            $A.enqueueAction(action);
        } else if (recordType == "Contact") {
            let action = component.get("c.getContacts");
            action.setParams({
                "limits": component.get("v.initialRows"),
                "offsets": component.get("v.rowNumberOffset"),
                "recordType": recordType
            });
            action.setCallback(this, function (response) {
                component.set("v.data", response.getReturnValue());
                component.set("v.currentOffsetCount", component.get("v.initialRows"));
                component.set("v.dataLength", component.get("v.data").length);
            });
            $A.enqueueAction(action);
        }
    },

    sortData: function (cmp, fieldName, sortDirection) {
        let data = cmp.get("v.data");
        let reverse = sortDirection !== 'asc';
        data.sort(this.sortBy(fieldName, reverse))
        cmp.set("v.data", data);
    },

    sortBy: function (field, reverse, primer) {
        let key = primer ?
            function (x) { return primer(x[field]) } :
            function (x) { return x[field] };
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    },

    fetchData: function (component) {
        let recordType = component.get("v.recordType");
        if (recordType == "Account") {
            return new Promise($A.getCallback(function (resolve, reject) {
                let currentDatatemp = component.get('c.getAccounts');
                currentDatatemp.setParams({
                    "limits": component.get("v.initialRows"),
                    "offsets": component.get("v.currentOffsetCount")
                });
                currentDatatemp.setCallback(this, function (response) {
                    resolve(response.getReturnValue());
                    let countstemps = component.get("v.currentOffsetCount");
                    countstemps = countstemps + component.get("v.initialRows");
                    component.set("v.currentOffsetCount", countstemps);
                    component.set("v.dataLength", component.get("v.data").length + component.get("v.initialRows"));
                });
                $A.enqueueAction(currentDatatemp);
            }));
        } else if (recordType == "Contact") {
            return new Promise($A.getCallback(function (resolve, reject) {
                let currentDatatemp = component.get('c.getContacts');
                currentDatatemp.setParams({
                    "limits": component.get("v.initialRows"),
                    "offsets": component.get("v.currentOffsetCount")
                });
                currentDatatemp.setCallback(this, function (response) {
                    resolve(response.getReturnValue());
                    let countstemps = component.get("v.currentOffsetCount");
                    countstemps = countstemps + component.get("v.initialRows");
                    component.set("v.currentOffsetCount", countstemps);
                    component.set("v.dataLength", component.get("v.data").length + component.get("v.initialRows"));
                });
                $A.enqueueAction(currentDatatemp);
            }));
        }
    }
})