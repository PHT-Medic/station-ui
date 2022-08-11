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

export type LocalTrain = {
    id?: string;
    name: string;
    created_at?: Date;
    updated_at?: Date;
};
