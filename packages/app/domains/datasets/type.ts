export enum DataType {
    IMAGE = 1,
    GENOME = 2,
    FHIR = 3,
    CSV = 4,
    STRUCTURED = 5,
    UNSTRUCTURED = 6,
}

export enum StorageType {
    LOCAL = 1,
    MINIO = 2,
    DB = 3,
}

export type Dataset = {
    id?: number;
    name: string;
    data_type: DataType;
    storage_type: StorageType;
    access_path?: string;
    summary?: Record<string, unknown>;
    fhir_server?: number;
    proposal_id?: string;
    created_at?: Date;
    updated_at?: Date;
};
