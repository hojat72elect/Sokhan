import {RemoteWordDefinition} from "./RemoteWordDefinition";

export type RemoteWordMeaning = {
    partOfSpeech: string;
    definitions: RemoteWordDefinition[];
    synonyms: string[];
    antonyms: any[];
}