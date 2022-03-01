/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { Train as CentralTrain, Proposal } from '@personalhealthtrain/central-common';
import { TrainAirflowConfig } from '../airflow';
import { ConfigurationCreate, ConfigurationMinimal } from '../config';

export type TrainState = {
    num_executions: number,
    status: string,
    last_execution: Date | string
};

export type TrainExecution = {
    start: Date | string,
    end: Date | string,
    airflow_dag_run: string
};

export type TrainExecutionConfig = {
    config_id: number | string,
    config_json: TrainAirflowConfig
};

export type Train = {
    name: string,
    created_at: Date | string,
    updated_at: Date | string,
    proposal_id: Proposal['id'],
    is_active: boolean,
    train_id: CentralTrain['id'],
    config_id: number,
    config: ConfigurationMinimal,
    state: TrainState,
    executions: TrainExecution[]
};

export type TrainCreate = Pick<Train, 'train_id'> &
Partial<Pick<Train, 'proposal_id'>> & {
    config?: ConfigurationCreate
};
