/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { TrainAirflowConfig } from '../airflow';

export type Configuration = {
    id: number,
    name: string,
    airflow_config: TrainAirflowConfig,
    // todo: this is a useless property atm
    cpu_requirements: Record<string, any>,
    // todo: this is a useless property atm
    gpu_requirements: Record<string, any>,
    auto_execute: boolean,

    created_at: Date | string,
    updated_at: Date | string,

    // todo: remove trains property, this will be bloated over time!
    trains: any[]
};

export type ConfigurationCreate = Pick<Configuration, 'name'> &
Partial<Pick<Configuration, 'airflow_config' | 'cpu_requirements' | 'gpu_requirements' | 'auto_execute'>>;

export type ConfigurationMinimal = Pick<Configuration, 'name'> &
Partial<Pick<Configuration, 'airflow_config' | 'gpu_requirements' | 'cpu_requirements' | 'auto_execute' | 'created_at' | 'updated_at'>>;
