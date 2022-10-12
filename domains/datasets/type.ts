export enum DataType {
    FHIR = 'fhir',
    STRUCTURED = 'structured',
    UNSTRUCTURED = 'unstructured',
    HYBRID = 'hybrid',
}

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

export type ColumnFigure = {
    fig_data: Record<string, unknown>;
};

export type TabularColumn = {
    title?: string;
    not_na_elements?: number;
    figure?: ColumnFigure;
    type: string;
};

export type UniqueColumn = Dataset & {number_of_duplicates?: number};

export type EqualColumn = TabularColumn & {value: string};

export type CategoricalColumn = TabularColumn & {
    number_categories?: number,
    value_counts?: Record<string, number>,
    most_frequent_element?: number | string,
    frequency? : number,
};

export type NumericalColumn = TabularColumn & {
    mean?: number,
    std?: number,
    min?: number,
    max?: number,
};

export type TabularDatasetStatistics = {
    n_items?: number;
    n_features?: number;
    column_information?: Array<EqualColumn | UniqueColumn | CategoricalColumn | NumericalColumn>;
};
