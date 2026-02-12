import {RemoteDefinition} from "./RemoteDefinition";

export type RemoteMeaning = {
    partOfSpeech: string;
    definitions: RemoteDefinition[];
    synonyms?: string[];
    antonyms?: string[];
}