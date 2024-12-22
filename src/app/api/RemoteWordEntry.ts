export type RemoteLicense = {
    name: string;
    url: string;
}

export type RemotePhonetic = {
    text: string;
    audio: string;
    sourceUrl: string;
    license: RemoteLicense;
}

export type RemoteWordDefinition = {
    definition: string;
    synonyms: any[];
    antonyms: any[];
    example: string;
}

export type RemoteWordMeaning = {
    partOfSpeech: string;
    definitions: RemoteWordDefinition[];
    synonyms: string[];
    antonyms: any[];
}

/**
 * The response we get from remote API is an array of this type.
 * This type is each one of the explanations you can find for a specific word inside our dictionary.
 */
export type RemoteWordEntry = {
    word: string;
    phonetic: string;
    phonetics: RemotePhonetic[];
    meanings: RemoteWordMeaning[];
    license: RemoteLicense;
    sourceUrls: string[];
};
export type RemoteWordDefinitions = RemoteWordEntry[];
