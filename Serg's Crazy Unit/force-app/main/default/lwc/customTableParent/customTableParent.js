import { LightningElement, track } from 'lwc';
import getAllObjects from '@salesforce/apex/DatalwcController.getAllObjects';
import getAllFields from '@salesforce/apex/DatalwcController.getAllFields';
/* eslint-disable no-console */
/* eslint-disable no-alert */
export default class ParentComponent extends LightningElement {
    @track fields;
    @track objectsOptions;
    @track fieldsWithOptions;
    @track btnLabel = 'Hide header';

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
        //this.template.querySelector('.parent_tableDiv').classList.add('slds-hide');
        this.template.querySelector(".parent_tableDiv").classList.remove('scrolling_bottom');
        this.template.querySelector(".parent_tableDiv").classList.add('scrolling_top');
        this.template.querySelector("c-table-component").clearData();
    }

    handleFieldsChange(event) {
        this.fields = event.detail.value;
    }

    showTable() {
        //this.template.querySelector('.parent_tableDiv').classList.remove('slds-hide');
        this.template.querySelector(".parent_tableDiv").classList.remove('scrolling_top');
        this.template.querySelector(".parent_tableDiv").classList.add('scrolling_bottom');
        this.template.querySelector("c-table-component").showTable();
    }

    handleHideHeader() {
        let element = this.template.querySelector(".component-card-header");
        element.classList.toggle('slds-hide');
        if (element.classList.contains('slds-hide')) {
            this.template.querySelector(".component-table").style = "height: 710px;";
            this.btnLabel = 'Show header';
        } else {
            this.template.querySelector(".component-table").style = "height: 390px;";
            this.btnLabel = 'Hide header';
        }
        
    }
}