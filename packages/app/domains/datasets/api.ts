import { ClientDriverInstance } from '@trapi/client';
import { Dataset } from './type';

export class DatasetAPI {
    protected client: ClientDriverInstance;

    constructor(client: ClientDriverInstance) {
        this.client = client;
    }

    async create(data: Dataset): Promise<Dataset> {
        const response = await this.client.post('/datasets', data);
        return response.data;
    }

    async get(id: any): Promise<Dataset> {
        const response = await this.client.get(`/datasets/${id}`);
        return response.data;
    }

    async getMany(): Promise<Dataset[]> {
        const response = await this.client.get('/datasets');
        return response.data;
    }

    async update(id: any, data: Dataset): Promise<Dataset> {
        const response = await this.client.put(`/datasets/${id}`, data);
        return response.data;
    }

    async delete(id: any): Promise<Dataset> {
        const response = await this.client.delete(`/datasets/${id}`);
        return response.data;
    }
}
