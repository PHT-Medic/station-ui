import { ClientDriverInstance } from 'hapic';
import { FHIRServer, ServerStatistics } from './type';

export class FhirAPI {
    protected client: ClientDriverInstance;

    constructor(client: ClientDriverInstance) {
        this.client = client;
    }

    async create(data: FHIRServer): Promise<FHIRServer> {
        const response = await this.client.post('/fhir/server', data);
        return response.data;
    }

    async get(id: any): Promise<FHIRServer> {
        const response = await this.client.get(`/fhir/server/${id}`);
        return response.data;
    }

    async getMany(): Promise<FHIRServer[]> {
        const response = await this.client.get('/fhir/server');
        return response.data;
    }

    async update(id: any, data: FHIRServer): Promise<FHIRServer> {
        const response = await this.client.put(`/fhir/server/${id}`, data);
        return response.data;
    }

    async delete(id: any): Promise<FHIRServer> {
        const response = await this.client.delete(`/fhir/server/${id}`);
        return response.data;
    }

    async stats(id: any): Promise<ServerStatistics> {
        const response = await this.client.get(`/fhir/server/${id}/stats`);
        return response.data;
    }
}
