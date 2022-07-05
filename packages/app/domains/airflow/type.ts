/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { DockerVolume } from '../docker';

export type AirflowEnvVariable = {
    key: string,
    value: string | boolean | number
};

export type TrainAirflowConfig = {
    env?: AirflowEnvVariable[],
    volumes?: DockerVolume[]
};

export type Task = {
    dag_id: string,
    duration: number,
    end_date: Date | string,
    execution_date: Date | string,
    executor_config: string,
    hostname: string,
    max_tries: number,
    operator: string,
    pid: number,
    priority_weight: number,
    queue: string,
    queued_when: Date | string,
    start_date: Date | string,
    state: string,
    task_id: string,
    try_number: number,
    unixname: string,
};

export type TaskList = {
    total_entries: number,
    task_instances: Task[]
};

export type AirflowDagRun = {
    dag_id: string,
    dag_run_id: string,
    execution_date: Date | string,
    state: string,
    external_trigger: boolean,
    start_date: Date | string,
    end_date: Date | string,
    tasklist: TaskList,
    logical_date: Date | string,
    conf: Record<string, any>
};
