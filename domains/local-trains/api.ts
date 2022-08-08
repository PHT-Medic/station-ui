import { ClientDriverInstance } from '@trapi/client';
import { nullifyEmptyObjectProperties } from '@authelion/common';
import { Configuration } from '../config';

import { LocalTrainMasterImage } from './type';

export class LocalTrainAPI {
    protected client: ClientDriverInstance;

    constructor(client: ClientDriverInstance) {
        this.client = client;
    }

    async masterImageCreate(data: LocalTrainMasterImage): Promise<LocalTrainMasterImage> {
        console.log(data);
        const response = await this.client.post('localTrains/masterImages', nullifyEmptyObjectProperties(data));

        return response.data;
    }

    async masterImageGetMany(skip?: number, limit?: number, sync?: boolean) : Promise<LocalTrainMasterImage[]> {
        if (skip === undefined) {
            skip = 0;
        }
        if (limit === undefined) {
            limit = 100;
        }
        if (sync === undefined) {
            sync = false;
        }
        const response = await this.client.get('localTrains/masterImages', {
            params: {
                skip,
                limit,
                sync,
            },
        });

        return response.data;
    }

    async masterImageGetOne(id: LocalTrainMasterImage['id']) : Promise<LocalTrainMasterImage> {
        const response = await this.client.get(`localTrains/masterImages/${id}`);
        return response.data;
    }

    async masterImageDelete(id: LocalTrainMasterImage['id']) : Promise<LocalTrainMasterImage> {
        const response = await this.client.delete(`localTrains/masterImages/${id}`);
        return response.data;
    }
}
