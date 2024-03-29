export enum AuthMethods {
    None = 'None',
    Basic = 'Basic',
    Bearer = 'Bearer',
    OIDC = 'OIDC',
}

export type FHIRServer = {
    id?: string;
    api_address: string;
    name?: string;
    password?: string;
    username?: string;
    token?: string;
    oidc_url?: string;
    oidc_client_id?: string;
    oidc_client_secret?: string;
    type?: string;
    proposal_id?: string;
    created_at?: Date;
    updated_at?: Date;
};

export type ResourceSummary = {
    resource: string;
    count: number;
};

export type ServerSummary = {
    name: string;
    resources: ResourceSummary[];
};

export type ServerStatistics = {
    created_at: Date;
    summary: ServerSummary;
    figure: Record<string, unknown>;
};
