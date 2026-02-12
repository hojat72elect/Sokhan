import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonList,
    IonPage,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React, {useState} from "react";
import axios from "axios";
import {RemoteDictionaryEntry} from "./data/RemoteDictionaryEntry";
import {RemoteMeaning} from "./data/RemoteMeaning";
import {RemoteDefinition} from "./data/RemoteDefinition";

export const Home: React.FC = () => {

    // What user inputs into the EditText
    const [userInput, setUserInput] = useState<string>("");

    // word definition result from server
    const [wordDefinition, setWordDefinition] = useState<RemoteDictionaryEntry | null>(null);

    // a flag reflecting whether the page is currently loading, or not
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetchDefinition = async () => {
        if (!userInput) return;

        setLoading(true);
        setError("");
        setWordDefinition(null);

        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`);
            setWordDefinition(response.data[0]);
        } catch (err) {
            setError(`Sorry, we couldn't find a definition for that word : ${err}`);
        } finally {
            setLoading(false);
        }

    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Sokhan Dictionary</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">

                <IonItem>
                    <IonInput
                        label="Enter a word"
                        labelPlacement="floating"
                        placeholder="e.g. Hello"
                        value={userInput}
                        onIonInput={(e) => setUserInput(e.detail.value!)}
                    ></IonInput>
                </IonItem>

                <IonButton
                    expand="block"
                    className="ion-margin-top"
                    onClick={fetchDefinition}
                    disabled={!userInput}
                >
                    Define
                </IonButton>

                {loading && (
                    <div style={{textAlign: 'center', marginTop: '20px'}}>
                        <IonSpinner name="crescent"/>
                    </div>
                )}

                {error && (
                    <IonText color="danger">
                        <p style={{textAlign: 'center'}}>{error}</p>
                    </IonText>
                )}

                {wordDefinition && (
                    <IonCard className="ion-margin-top">
                        <IonCardHeader>
                            <IonCardTitle style={{textTransform: "capitalize"}}>
                                {wordDefinition.word}
                            </IonCardTitle>
                            {wordDefinition.phonetic && (
                                <IonText color="medium">
                                    <p>{wordDefinition.phonetic}</p>
                                </IonText>
                            )}
                        </IonCardHeader>

                        <IonCardContent>
                            <IonList lines="none">
                                {wordDefinition.meanings.map((meaning: RemoteMeaning, index: number) => (
                                    <div key={index}>
                                        <h1><strong>{meaning.partOfSpeech}</strong></h1>
                                        <ul>
                                            {meaning.definitions.map((def: RemoteDefinition, idx: number) => (
                                                <li key={idx} style={{marginBottom: '8px', fontSize: '18px'}}>
                                                    {def.definition}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </IonList>

                        </IonCardContent>
                    </IonCard>
                )}

            </IonContent>
        </IonPage>
    );
};
