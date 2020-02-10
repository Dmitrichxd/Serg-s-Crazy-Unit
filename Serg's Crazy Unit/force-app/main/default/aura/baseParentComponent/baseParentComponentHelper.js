({
    fieldsInit: function (component) {
        //component.set("v.windowHeight", component.get("v.rowsNumberToLoad") * 20);
        let fields = component.get("v.fieldsToDisplay").split(',');
        fields.forEach(function (col, i) {
            fields[i] = col.trim();
        });
        let action = component.get("c.getColumnsAndTypes");
        action.setParams({ columns: fields });
        action.setCallback(this, function (response) {
            let columns = [];
            let returnedFields = response.getReturnValue();
            fields = [];
            for (let key in returnedFields) {
                columns.push({
                    "sortable": true,
                    "label": key,
                    "dataType": returnedFields[key],
                    "name": key
                });
                fields.push(key);
            }
            component.set("v.columns", columns);
            component.set("v.fieldsToDisplay", fields);
            let tableInit = component.get("c.getContacts");
            let data = {};
            tableInit.setParams({ columns: component.get("v.fieldsToDisplay") });
            tableInit.setCallback(this, function (response) {
                data.columns = columns;
                data.rows = response.getReturnValue();
                component.set("v.data", data);
            });
            $A.enqueueAction(tableInit);
        });
        $A.enqueueAction(action);
    },

    addEventListeners: function (component) {
        try {
            // get scroll element
            let element = document.getElementById("scrollingArea");
            console.log("Поiхали");
            // define listener options
            const options = {
                "passive": true
            };
            // add touch move event listener, just for touch devices
            element.addEventListener("touchmove", $A.getCallback(function (event) {
                if (component.isValid()) {
                    // prevent touch move event propagation
                    event.stopPropagation();
                }
            }), options);
            // add scroll event listener
            element.addEventListener("scroll", $A.getCallback(function (event) {
                if (component.isValid()) {
                    component.set("v.offset", this.scrollTop);
                    if ((this.clientHeight < this.scrollHeight) &&
                        (this.scrollTop + this.clientHeight >=
                            this.scrollHeight - 100)) {
                        let childTable = component.find("dynamicTable");
                        childTable.loadMore();
                    }
                }
            }), options);
        } catch (e) {
            console.error(e);
        }
    },
})