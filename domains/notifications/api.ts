import { ClientDriverInstance } from 'hapic';
import { Notification } from './type';

export class NotificationAPI {
    protected client: ClientDriverInstance;

    constructor(client: ClientDriverInstance) {
        this.client = client;
    }

    async getMany(skip?: number, limit?: number): Promise<Notification[]> {
        if (skip === undefined || skip === null) {
            skip = 0;
        }
        if (limit === undefined || limit === null) {
            limit = 100;
        }
        const response = await this.client.get('/notifications', {
            params: {
                skip,
                limit,
            },
        });
        return response.data;
    }

    async getOne(id: Notification['id']): Promise<Notification> {
        const response = await this.client.get(`/notifications/${id}`);
        return response.data;
    }

    async delete(id: Notification['id']): Promise<Notification> {
        const response = await this.client.delete(`/notifications/${id}`);
        return response.data;
    }

    async markAsRead(id: Notification['id']): Promise<Notification> {
        const response = await this.client.put(`/notifications/${id}`, {
            is_read: true,
        });
        return response.data;
    }
}
