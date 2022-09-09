import { ClientDriverInstance } from 'hapic';
import { nullifyEmptyObjectProperties } from '@authelion/common';
import { Configuration } from '../config';
import { MinioFile } from '../files/type';

import {
    LocalTrain, LocalTrainCreate, LocalTrainMasterImage, LocalTrainUpdate,
} from './type';

export class LocalTrainAPI {
    protected client: ClientDriverInstance;

    constructor(client: ClientDriverInstance) {
        this.client = client;
    }

    async create(data: LocalTrainCreate): Promise<LocalTrain> {
        const response = await this.client.post('/local-trains', data);
        return response.data;
    }

    async get(id: LocalTrain['id']): Promise<LocalTrain> {
        const response = await this.client.get(`/local-trains/${id}`);
        return response.data;
    }

    async getMany(skip?: number, limit?: number, sync?: boolean): Promise<LocalTrain[]> {
        if (skip === undefined) {
            skip = 0;
        }
        if (limit === undefined) {
            limit = 100;
        }
        if (sync === undefined) {
            sync = false;
        }
        const response = await this.client.get('/local-trains', {
            params: {
                skip,
                limit,
                sync,
            },
        });
        return response.data;
    }

    async addFiles(id: LocalTrain['id'], files: FormData): Promise<any> {
        const response = await this.client.post(`/local-trains/${id}/files`, files);
        return response.data;
    }

    async getFiles(id: LocalTrain['id']): Promise<MinioFile[]> {
        const response = await this.client.get(`/local-trains/${id}/files`);
        return response.data;
    }

    async run(id: LocalTrain['id'], configId: string | null, datasetId: string | null): Promise<any> {
        console.log('call run api', id, configId, datasetId);
        const config = {
            config_id: configId === undefined || configId === '0' ? null : Number(configId),
            dataset_id: datasetId !== undefined ? datasetId : null,
        };
        console.log('config', config);
        const response = await this.client.post(`/local-trains/${id}/run`, config);
        return response.data;
    }

    async deleteFile(id: LocalTrain['id'], filename: string): Promise<any> {
        const response = await this.client.delete(`/local-trains/${id}/files/${filename}`);
        return response.data;
    }

    async deleteFiles(id: LocalTrain['id'], files: string[]): Promise<any> {
        const response = await this.client.delete(`/local-trains/${id}/files`, {
            data: {
                files,
            },
        });
        return response.data;
    }

    async update(id: LocalTrain['id'], data: LocalTrainUpdate): Promise<LocalTrain> {
        const response = await this.client.put(`/local-trains/${id}`, data);
        return response.data;
    }

    async delete(id: LocalTrain['id']): Promise<LocalTrain> {
        const response = await this.client.delete(`/local-trains/${id}`);
        return response.data;
    }

    async masterImageCreate(data: LocalTrainMasterImage): Promise<LocalTrainMasterImage> {
        const response = await this.client.post('master-images', nullifyEmptyObjectProperties(data));

        return response.data;
    }

    async masterImageGetMany(skip?: number, limit?: number, sync?: boolean): Promise<LocalTrainMasterImage[]> {
        if (skip === undefined) {
            skip = 0;
        }
        if (limit === undefined) {
            limit = 100;
        }
        if (sync === undefined) {
            sync = false;
        }
        const response = await this.client.get('master-images', {
            params: {
                skip,
                limit,
                sync,
            },
        });

        return response.data;
    }

    async masterImageGetOne(id: LocalTrainMasterImage['id']): Promise<LocalTrainMasterImage> {
        const response = await this.client.get(`master-images/${id}`);
        return response.data;
    }

    async masterImageDelete(id: LocalTrainMasterImage['id']): Promise<LocalTrainMasterImage> {
        const response = await this.client.delete(`master-images/${id}`);
        return response.data;
    }
}
