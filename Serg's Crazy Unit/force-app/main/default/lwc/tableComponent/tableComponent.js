import { LightningElement, api, track } from 'lwc';
import getColumnsAndTypeslwc from '@salesforce/apex/DatalwcController.getColumnsAndTypeslwc';
import getSelectedFields from '@salesforce/apex/DatalwcController.getSelectedFields';
/* eslint-disable no-console */
/* eslint-disable no-alert */
export default class TableComponent extends LightningElement {
    @api objectValue;
    @api fields;
    @track columnsWithTypes;
    @track objectData;
    @track fieldAPIs;

    @api showTable() {
        getColumnsAndTypeslwc({
            columns: this.fields.toString(),
            selectedObject: this.objectValue
        }).then(data => {
            let arr = [{}];
            let fieldApi = [];
            let i = 0;
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    arr.push({
                        fieldName: key,
                        label: this.fields[i],
                        type: data[key]
                    });
                    fieldApi.push(key);
                    i += 1;
                }
            }
            arr.shift();
            this.columnsWithTypes = arr;
            this.fieldAPIs = fieldApi;
            console.log(this.fieldAPIs.toString());
            getSelectedFields({
                columns: this.fieldAPIs.toString(),
                selectedObject: this.objectValue
            }).then(response => {
                this.objectData = response;
            }).catch(error => {
                console.log(error);
            });
        }).catch(error => {
            console.log(error);
        });
    }
}