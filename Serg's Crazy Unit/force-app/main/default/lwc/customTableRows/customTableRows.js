import { LightningElement, api, track } from 'lwc';
/* eslint-disable no-console */
/* eslint-disable no-alert */
export default class CustomTableRows extends LightningElement {
    @api object;
    @api fieldAPIs;
    @track values;

    connectedCallback() {
        //let values;
        console.log('123');
        this.fieldAPIs.forEach(el => {
            console.log(el);
        });
    }
}