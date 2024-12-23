import {RemoteWordEntry} from "./entities/RemoteWordEntry";
import axios from "axios";

/**
 * This datasource is the access point for getting the definition of a word from "dictionaryapi.dev" API.
 */
export class RemoteDictionaryDataSource {
    constructor() {
    }

    async fetRemoteEntries(inputWord: string): Promise<RemoteWordEntry[]> {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`;
        const apiResponse = await axios.get<RemoteWordEntry[]>(url);
        return apiResponse.data;
    }
}