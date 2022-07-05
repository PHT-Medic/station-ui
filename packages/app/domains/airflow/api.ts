import { ClientDriverInstance } from '@trapi/client';

export class AirflowApi {
    protected client: ClientDriverInstance;

    constructor(client: ClientDriverInstance) {
        this.client = client;
    }

    async getTaskLog(dagId: string, runId: string, taskId: string, tryNumber: number): Promise<string> {
        const response = await this.client.get(`airflow/logs/${dagId}/${taskId}/${runId}`, {
            params: { task_try_number: tryNumber },
        });
        console.log(response.data);
        return response.data;
    }
}
