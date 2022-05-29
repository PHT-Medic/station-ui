export enum DataType {
    FHIR = 'fhir',
    STRUCTURED = 'structured',
    UNSTRUCTURED = 'unstructured',
    HYBRID = 'hybrid',
}

export enum StorageType {
    LOCAL = 'local',
    MINIO = 'minio',
    DB = 'db',
}

export type Dataset = {
    id?: number | string;
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
