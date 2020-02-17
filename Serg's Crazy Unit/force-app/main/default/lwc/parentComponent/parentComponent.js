import { LightningElement, track } from 'lwc';
import getAllObjects from '@salesforce/apex/DatalwcController.getAllObjects';
import getAllFields from '@salesforce/apex/DatalwcController.getAllFields';
/* eslint-disable no-console */
/* eslint-disable no-alert */
export default class ParentComponent extends LightningElement {
    @track objectValue;
    @track fields;
    @track objectsOptions;
    @track fieldsWithOptions;
    @track isTableVisible = false;

    connectedCallback() {
        getAllObjects()
            .then(data => {
                this.objectsOptions = data;
                console.log('Objects has been loaded!');
            })
            .catch(error => {
                console.log(error);
            });
    }

    objectChangeHandler(event) {
        getAllFields({
            selectedObject: event.target.value
        })
            .then(data => {
                let arr = [{}];
                data.forEach(element => {
                    arr.push({
                        value: element,
                        label: element
                    });
                });
                arr.shift();
                this.fieldsWithOptions = arr;
            })
            .catch(error => {
                console.log(error);
            });
        this.objectValue = event.target.value;
        this.isTableVisible = false;
    }

    handleFieldsChange(event) {
        this.fields = event.detail.value;
    }

    showTable() {
        this.isTableVisible = true;
        this.template.querySelector("c-table-component").showTable();
    }
}