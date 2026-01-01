import { LightningElement, api, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SPEAKER_CHANNEL from '@salesforce/messageChannel/SdbMsgChannel__c';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email', fieldName: 'Email__c' },
    { label: 'Speciality', fieldName: 'Speciality__c' },
    {
        type: 'button',
        typeAttributes: {
            label: 'Book Session',
            variant: 'brand'
        }
    }
];

export default class SpeakerList extends LightningElement {
    @api speakers;
    columns = columns;

    @wire(MessageContext)
    messageContext;

    handleAction(event) {
        publish(this.messageContext, SPEAKER_CHANNEL, {
            speakerId: event.detail.row.Id
        });
    }
}