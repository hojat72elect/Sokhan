import {RemoteLicense} from "./RemoteLicense";

export type RemotePhonetic = {
    text: string;
    audio: string;
    sourceUrl: string;
    license: RemoteLicense;
}