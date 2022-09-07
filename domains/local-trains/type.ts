export type LocalTrainMasterImage = {
    id?: string;
    registry?: string;
    group?: string;
    artifact?: string;
    tag?: string;
    image_id?: string;
    created_at?: Date;
    updated_at?: Date;
};

export enum ConfigurationState {
    base = 'base',
    image = 'imageConfiguration',
    files = 'filesConfiguration',
    run = 'runConfiguration',
}

export type LocalTrainState = {
    id: number;
    last_execution?: Date;
    num_executions?: number;
    status: string;
    configuration_state: string;
};

export type LocalTrain = {
    id?: string;
    name: string;
    created_at?: Date;
    updated_at?: Date;
    entrypoint?: string;
    files?: string[];
    state: LocalTrainState;
    fhir_query?: string;
    master_image_id?: string;
    custom_image?: string;
    config_id?: string;
    dataset_id?: string;
};

export type LocalTrainCreate = Pick<LocalTrain, 'id'> & Partial<Pick<LocalTrain, 'name'>>;

export type LocalTrainUpdate = Partial<
Pick<
LocalTrain, 'name' | 'entrypoint' | 'files' | 'fhir_query' | 'custom_image' | 'master_image_id' | 'config_id' | 'dataset_id'
>
>;
