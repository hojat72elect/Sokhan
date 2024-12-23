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
import {RemoteWordEntry} from "../api/entities/RemoteWordEntry";
import axios from "axios";

async function fetchRemoteWordEntries(inputWord: string): Promise<RemoteWordEntry[]> {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`;
    const apiResponse = await axios.get<RemoteWordEntry[]>(url);
    return apiResponse.data;
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, FormsModule],
})
export class HomePage {
    inputText: string = '';

    constructor() {
    }

    searchWord() {
        fetchRemoteWordEntries(this.inputText).then(entries => {
            console.log(entries[0].meanings[0].definitions[0].definition);
        })
        this.inputText = '';
    }
}