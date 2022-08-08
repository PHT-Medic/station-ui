export enum AuthMethods {
    None = 'None',
    Basic = 'Basic',
    Bearer = 'Bearer',
    OIDC = 'OIDC',
}

export type FHIRServer = {
    id?: number;
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
