/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { ClientDriverInstance } from '@trapi/client';
import { Train } from '../train';
import { Configuration } from './type';

export class TrainConfigAPI {
    protected client: ClientDriverInstance;

    constructor(client: ClientDriverInstance) {
        this.client = client;
    }

    async create(trainId: Train['train_id'], configId: Configuration['id']) : Promise<any> {
        await this.client.post(`trains/docker/${trainId}/config/${configId}`);
        // todo: return value should describe relation
    }

    async delete(trainId: Train['train_id'], configId: Configuration['id']) : Promise<any> {
        // not implemented yet....

    }
}
