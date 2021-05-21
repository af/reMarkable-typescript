/// <reference types="node" />
import { ItemResponse } from './types';
declare type Props = {
    deviceToken?: string;
};
export default class Remarkable {
    token?: string;
    deviceToken?: string;
    private gotClient;
    private storageUrl?;
    private notificationUrl?;
    private zip;
    constructor({ deviceToken }?: Props);
    private setToken;
    refreshToken(): Promise<string>;
    getStorageUrl({ environment, group, apiVer, }?: {
        environment?: string | undefined;
        group?: string | undefined;
        apiVer?: number | undefined;
    }): Promise<string>;
    getNotificationsUrl({ environment, group, apiVer, }?: {
        environment?: string | undefined;
        group?: string | undefined;
        apiVer?: number | undefined;
    }): Promise<string>;
    register({ code, deviceDesc, deviceId, }: {
        code: string;
        deviceDesc?: string;
        deviceId?: string;
    }): Promise<string>;
    private listItems;
    getItemWithId(id: string): Promise<ItemResponse>;
    getAllItems(): Promise<ItemResponse[]>;
    deleteItem(id: string, version: number): Promise<boolean>;
    downloadZip(id: string): Promise<Buffer>;
    uploadZip(name: string, ID: string, zipFile: Buffer, parent?: string): Promise<string>;
    uploadPDF(name: string, file: Buffer): Promise<string>;
    /**
     *
     * @param name the display name for the document
     * @param id uuid string that identifies the document
     * @param file the file data we would like to upload
     * @param parentId (optional) if the document should belong to a folder the uuid of the folder must be specified
     */
    uploadEPUB(name: string, id: string, file: Buffer, parentId?: string): Promise<string>;
    createDirectory(name: string, ID: string, parent?: string): Promise<string>;
}
export {};
