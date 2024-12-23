import {Component} from '@angular/core';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
} from '@ionic/angular/standalone';
import {FormsModule} from "@angular/forms";
import {RemoteDictionaryDataSource} from "../api/RemoteDictionaryDataSource";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, FormsModule],
})
export class HomePage {
    inputText: string = '';
    searchResults:string='';

    constructor() {
    }

    searchWord() {

        const dataSource = new RemoteDictionaryDataSource();
        dataSource.fetRemoteEntries(this.inputText).then(entries => {
            this.searchResults = entries[0].meanings[0].definitions[0].definition;
        })
        this.inputText = '';
    }
}