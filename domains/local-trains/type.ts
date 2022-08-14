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
};
