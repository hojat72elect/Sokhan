import {RemoteLicense} from "./RemoteLicense";
import {RemotePhonetic} from "./RemotePhonetic";
import {RemoteWordMeaning} from "./RemoteWordMeaning";

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
