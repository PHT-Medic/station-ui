export type Notification = {
    id?: number,
    target_user: string,
    topic: string,
    title?: string,
    message?: string,
    is_read: boolean,
    created_at?: Date,
};
