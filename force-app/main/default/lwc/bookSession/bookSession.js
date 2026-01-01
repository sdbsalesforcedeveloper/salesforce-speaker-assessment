import { LightningElement, wire, track } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import SPEAKER_CHANNEL from '@salesforce/messageChannel/SdbMsgChannel__c';

import getSpeaker from '@salesforce/apex/speakersearch.getSpeaker';
import isAvailable from '@salesforce/apex/speakersearch.isAvailable';
import createAssignment from '@salesforce/apex/speakersearch.createAssignment';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BookSession extends LightningElement {
    @track speaker;
    selectedDate;
    disableCreate = true;
    today = new Date().toISOString().split('T')[0];

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        subscribe(this.messageContext, SPEAKER_CHANNEL, (msg) => {
            getSpeaker({ speakerId: msg.speakerId }).then(result => {
                this.speaker = result;
                this.disableCreate = true;
            });
        });
    }

    handleDate(e) {
        this.selectedDate = e.target.value;

        isAvailable({
            speakerId: this.speaker.Id,
            selectedDate: this.selectedDate
        }).then(result => {
            this.disableCreate = !result;
            if (!result) {
                this.showToast('Error', 'Slot already booked', 'error');
            }
        });
    }

    createAssignment() {
        createAssignment({
            speakerId: this.speaker.Id,
            selectedDate: this.selectedDate
        }).then(() => {
            this.showToast('Success', 'Assignment Created Successfully', 'success');
            this.disableCreate = true;
        }).catch(error =>{
            this.showToast('Error', error.body.message, 'error');});
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}