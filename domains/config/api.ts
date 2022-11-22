/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { ClientDriverInstance } from 'hapic';
import { nullifyEmptyObjectProperties } from '@authelion/common';
import { Train } from '../train';
import { Configuration, ConfigurationCreate } from './type';

export class ConfigurationAPI {
    protected client: ClientDriverInstance;

    constructor(client: ClientDriverInstance) {
        this.client = client;
    }

    async create(data: ConfigurationCreate) : Promise<Configuration> {
        console.log(data);
        const response = await this.client.post('trains/docker/config', nullifyEmptyObjectProperties(data));

        return response.data;
    }

    async getMany() : Promise<Configuration[]> {
        const response = await this.client.get('trains/docker/configs/all');

        return response.data;
    }

    async getOne(id: Train['train_id']) : Promise<Configuration> {
        const response = await this.client.get(`trains/docker/config/${id}`);

        return response.data;
    }

    async delete(id: Train['train_id']) : Promise<Configuration[]> {
        const response = await this.client.delete(`trains/docker/config/${id}`);

        return response.data;
    }

    async update(id: Train['train_id'], data: ConfigurationCreate) : Promise<Configuration> {
        const response = await this.client.put(`trains/docker/config/${id}`, nullifyEmptyObjectProperties(data));

        return response.data;
    }
}
