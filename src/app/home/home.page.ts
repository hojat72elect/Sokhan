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

    logInputText() {
        console.log(this.inputText);
        this.inputText = '';
    }
}