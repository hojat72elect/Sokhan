import {RemotePhonetic} from "./RemotePhonetic";
import {RemoteMeaning} from "./RemoteMeaning";
import {RemoteLicense} from "./RemoteLicense";

export type RemoteDictionaryEntry = {
    word: string;
    phonetic?: string;
    phonetics: RemotePhonetic[];
    meanings: RemoteMeaning[];
    license: RemoteLicense;
    sourceUrls: string[];
}