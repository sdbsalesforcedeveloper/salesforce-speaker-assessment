import { LightningElement, track } from 'lwc';
import searchSpeakers from '@salesforce/apex/speakersearch.searchSpeakers';

export default class SpeakerSearch extends LightningElement {
    nameKey = '';
    specKey = '';
    @track speakers = [];

    handleName(event) {
        this.nameKey = event.target.value;
    }

    handleSpec(event) {
        this.specKey = event.target.value;
    }

    search(event) {
        searchSpeakers({
            nameKey: this.nameKey,
            specialityKey: this.specKey
        }).then(result => {
            this.speakers = result;
        });
    }
}