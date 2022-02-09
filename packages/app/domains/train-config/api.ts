/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { ClientDriverInstance } from '@trapi/client';
import { nullifyEmptyObjectProperties } from '@typescript-auth/domains';
import { Train } from '../train';
import { TrainConfigCreate } from './type';

export class TrainConfigAPI {
    protected client: ClientDriverInstance;

    constructor(client: ClientDriverInstance) {
        this.client = client;
    }

    async create(data: TrainConfigCreate) : Promise<Train> {
        const response = await this.client.post('trains/docker/config', nullifyEmptyObjectProperties(data));

        return response.data;
    }

    async getMany() : Promise<Train[]> {
        const response = await this.client.get('trains/docker/config');

        return response.data;
    }

    async getOne(id: Train['train_id']) : Promise<Train[]> {
        const response = await this.client.get(`trains/docker/config/${id}`);

        return response.data;
    }
}
