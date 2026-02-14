import {
    InputInputEventDetail,
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
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {RemoteDictionaryEntry} from "./data/RemoteDictionaryEntry";
import {RemoteMeaning} from "./data/RemoteMeaning";
import {RemoteDefinition} from "./data/RemoteDefinition";
import {IonInputCustomEvent} from "@ionic/core/dist/types/components";

export const Home: React.FC = () => {

    // What user inputs into the EditText (it will change as user types in)
    const [userInput, setUserInput] = useState<string>("");

    // word definition result from server
    const [wordDefinition, setWordDefinition] = useState<RemoteDictionaryEntry | null>(null);

    // a flag reflecting whether the page is currently loading, or not
    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<string>('');

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [suggestionsLoading, setSuggestionsLoading] = useState<boolean>(false);

    // Direct DOM reference to the <IonInput> element
    const inputRef = useRef<HTMLIonInputElement>(null);

    /**
     * This function makes an API request and returns the definition of the word
     */
    const fetchDefinition = async () => {
        if (!userInput) return;

        setLoading(true);
        setError("");
        setWordDefinition(null);
        setShowSuggestions(false);

        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`);
            setWordDefinition(response.data[0]);
        } catch (err) {
            setError(`Sorry, we couldn't find a definition for that word : ${err}`);
        } finally {
            setLoading(false);
        }

    };

    /**
     * only finds the suggestions that are close to the input query.
     *
     * @param query the text that we are going to use to find the suggestions close to it.
     */
    const fetchSuggestions = (query: string) => {
        if (!query || query.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        setSuggestionsLoading(true);
        try {
            // todo : this is only temporary and will be replaced by a better approach
            const commonWords = [
                'hello', 'world', 'computer', 'programming', 'javascript', 'react', 'typescript',
                'dictionary', 'language', 'english', 'learning', 'development', 'software', 'application',
                'interface', 'component', 'function', 'variable', 'constant', 'array', 'object',
                'string', 'number', 'boolean', 'undefined', 'null', 'document', 'element',
                'style', 'class', 'method', 'property', 'event', 'listener', 'callback',
                'promise', 'async', 'await', 'fetch', 'response', 'request', 'server',
                'client', 'frontend', 'backend', 'database', 'query', 'result', 'error'
            ];

            const filtered = commonWords.filter(word =>
                word.toLowerCase().startsWith(query.toLowerCase())
            ).slice(0, 8);

            setSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        } catch (err) {
            console.error('Error fetching suggestions:', err);
        } finally {
            setSuggestionsLoading(false);
        }
    };

    /**
     * This function will be called each time contents of the input change.
     */
    const onInputChanged = (event: IonInputCustomEvent<InputInputEventDetail>) => {
        const value = event.detail.value || '';
        setUserInput(value);
        fetchSuggestions(value);
    };

    const selectSuggestion = (suggestion: string, event: React.MouseEvent<HTMLIonItemElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setUserInput(suggestion);
        setShowSuggestions(false);
        setSuggestions([]);

        // Maintain focus on the input after selection
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.setFocus();
            }
        }, 0);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.suggestions-dropdown') && !target.closest('ion-input')) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Sokhan Dictionary</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">

                <div className="input-container">
                    <IonInput
                        ref={inputRef}
                        label="Enter a word"
                        labelPlacement="floating"
                        placeholder="e.g. Hello"
                        value={userInput}
                        onIonInput={onInputChanged}
                    ></IonInput>

                    {showSuggestions && (
                        <div className="suggestions-dropdown">
                            <IonList>
                                {suggestionsLoading ? (
                                    <IonItem>
                                        <IonSpinner name="dots" style={{width: '20px', height: '20px'}}/>
                                        <IonText color="medium" style={{marginLeft: '10px'}}>Loading
                                            suggestions...</IonText>
                                    </IonItem>
                                ) : suggestions.length > 0 ? (
                                    suggestions.map((suggestion, index) => (
                                        <IonItem
                                            key={index}
                                            button
                                            onClick={(clickEvent) => selectSuggestion(suggestion, clickEvent)}
                                            onMouseDown={(mouseDownEvent) => mouseDownEvent.preventDefault()}
                                            style={{cursor: 'pointer'}}
                                        >
                                            <IonText>{suggestion}</IonText>
                                        </IonItem>
                                    ))
                                ) : (
                                    <IonItem>
                                        <IonText color="medium">No suggestions found</IonText>
                                    </IonItem>
                                )}
                            </IonList>
                        </div>
                    )}
                </div>

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
