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

export const Home: React.FC = () => {

    const [inputWord, setInputWord] = useState<string>(""); // user's input
    const [definitionData, setDefinitionData] = useState<any>(null); // word definition result from server
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetchDefinition = async () => {
        if (!inputWord) return;

        setLoading(true);
        setError("");
        setDefinitionData(null);

        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`);
            setDefinitionData(response.data[0]);
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
                        value={inputWord}
                        onIonInput={(e) => setInputWord(e.detail.value!)}
                    ></IonInput>
                </IonItem>

                <IonButton
                    expand="block"
                    className="ion-margin-top"
                    onClick={fetchDefinition}
                    disabled={!inputWord}
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

                {definitionData && (
                    <IonCard className="ion-margin-top">
                        <IonCardHeader>
                            <IonCardTitle style={{textTransform: "capitalize"}}>
                                {definitionData.word}
                            </IonCardTitle>
                            {definitionData.phonetic && (
                                <IonText color="medium">
                                    <p>{definitionData.phonetic}</p>
                                </IonText>
                            )}
                        </IonCardHeader>

                        <IonCardContent>
                            <IonList lines="none">
                                {definitionData.meanings.map((meaning: any, index: number) => (
                                    <div key={index}>
                                        <h3><strong>{meaning.partOfSpeech}</strong></h3>
                                        <ul>
                                            {meaning.definitions.map((def: any, idx: number) => (
                                                <li key={idx} style={{marginBottom: '8px'}}>
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
