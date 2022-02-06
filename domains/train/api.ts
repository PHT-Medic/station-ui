/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { ClientDriverInstance } from '@trapi/client';
import { nullifyEmptyObjectProperties } from '@typescript-auth/domains';
import { Train } from './type';

export class TrainAPI {
    protected client: ClientDriverInstance;

    constructor(client: ClientDriverInstance) {
        this.client = client;
    }

    async create(data: Partial<Train>) {
        const response = await this.client.post('trains', nullifyEmptyObjectProperties(data));

        return response.data;
    }
}
