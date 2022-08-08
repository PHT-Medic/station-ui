export enum DataType {
    FHIR = 'fhir',
    STRUCTURED = 'structured',
    UNSTRUCTURED = 'unstructured',
    HYBRID = 'hybrid',
}

export type DatasetFile = {
    file_name: string;
    full_path: string;
    size: number;
    updated_at?: Date;
};

export type Dataset = {
    id?: number | string;
    name: string;
    data_type: DataType;
    access_path?: string;
    summary?: Record<string, unknown>;
    fhir_server?: number;
    proposal_id?: string;
    created_at?: Date;
    updated_at?: Date;
};
