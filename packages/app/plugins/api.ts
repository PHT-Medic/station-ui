/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    Config, setClient,
} from '@trapi/client';
import { Context } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';
import { HTTPClient as AuthHTTPClient } from '@authelion/common';
import { HTTPClient as CentralHTTPClient } from '@personalhealthtrain/central-common';
import { setHTTPClient } from '@authelion/vue';
import { HTTPClient } from '../config/http/client';

export default (ctx: Context, inject : Inject) => {
    const interceptor = (error) => {
        if (typeof error?.response?.data?.message === 'string') {
            error.message = error.response.data.message;
            throw error;
        }

        throw new Error('A network error occurred.');
    };

    // ----------------------------------------------------------

    const config : Config = {
        driver: {
            baseURL: ctx.$config.apiUrl || process.env.API_URL,
            withCredentials: true,
        },
    };

    const api = new CentralHTTPClient(config);
    api.mountResponseInterceptor((r) => r, interceptor);

    setClient(api);
    inject('api', api);

    // ----------------------------------------------------------

    const authConfig : Config = { ...config };

    authConfig.driver.baseURL = `${process.server ? process.env.AUTH_API_URL : '/auth/api'}`;

    const authAPI = new AuthHTTPClient(authConfig);
    authAPI.mountResponseInterceptor((r) => r, interceptor);

    setHTTPClient(authAPI);
    setClient(authAPI, 'auth');
    inject('authApi', authAPI);

    // ----------------------------------------------------------

    const stationConfig : Config = { ...config };
    authConfig.driver.baseURL = `${process.server ? process.env.STATION_API_URL : '/station/api'}`;

    const stationApi = new HTTPClient(stationConfig);

    setClient(stationApi, 'station');
    inject('stationApi', stationApi);
};
