/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { ClientDriverInstance } from '@trapi/client';
import { nullifyEmptyObjectProperties } from '@authelion/common';
import { AirflowDagRun } from '../airflow';
import {
    Train, TrainCreate, TrainExecution, TrainExecutionConfig,
} from './type';

export class TrainAPI {
    protected client: ClientDriverInstance;

    constructor(client: ClientDriverInstance) {
        this.client = client;
    }

    async create(data: TrainCreate) : Promise<Train> {
        const response = await this.client.post('trains/docker', nullifyEmptyObjectProperties(data));

        return response.data;
    }

    async getMany() : Promise<Train[]> {
        const response = await this.client.get('trains/docker');

        return response.data;
    }

    async getOne(id: Train['train_id']) : Promise<Train[]> {
        const response = await this.client.get(`trains/docker/${id}`);

        return response.data;
    }

    async sync() : Promise<Train[]> {
        const response = await this.client.post('trains/docker/sync');

        return response.data;
    }

    async update(id: Train['train_id'], data: Partial<Train>) : Promise<Train> {
        const { config_id: configId, ...train } = data;
        if (configId) {
            const response = await this.client.post(`trains/docker/${id}/config/${configId}`);

            return response.data;
        }

        // todo:  ... handler for other properties required!

        console.warn(`The train properties ${Object.keys(train).join(',')} could not be processed.`);

        return data as Train;
    }

    async run(id: Train['train_id'], data: TrainExecutionConfig) : Promise<Train> {
        console.log('run', data);
        const response = await this.client.post(`trains/docker/${id}/run`, nullifyEmptyObjectProperties(data));
        return response.data;
    }

    async getExecutions(id: Train['train_id']) : Promise<TrainExecution[]> {
        console.log('getExecutions', id);
        const response = await this.client.get(`trains/docker/${id}/executions`);

        return response.data;
    }

    async getTrainExecution(executionId: TrainExecution['airflow_dag_run']) : Promise<AirflowDagRun> {
        const response = await this.client.get(`airflow/logs/run_pht_train/${executionId}`);
        return response.data;
    }
}
