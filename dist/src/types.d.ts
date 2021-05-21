export declare type ItemResponse = {
    ID: string;
    Version: number;
    Message: string;
    Success: boolean;
    BlobURLGet?: string;
    BlobURLGetExpires?: string;
    ModifiedClient: string;
    Type: ItemType;
    VissibleName: string;
    CurrentPage: number;
    Bookmarked: boolean;
    Parent: string;
};
export declare enum ItemType {
    DocumentType = "DocumentType",
    CollectionType = "CollectionType"
}
export declare type ReturnType = {
    ID: string;
    Version: number;
    Message: string;
    Success: boolean;
};
export declare type UploadRequestReturnType = {
    ID: string;
    Version: number;
    Message: string;
    Success: boolean;
    BlobURLPut: string;
    BlobURLPutExpires: string;
};
