/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { Context } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';
import AuthModule from '../config/auth';

export default (context: Context, inject: Inject) => {
    const auth = new AuthModule(context, {
        token_endpoint: new URL('token', context.$config.authApiUrl).href,
        introspection_endpoint: new URL('token/introspect', context.$config.authApiUrl).href,
        userinfo_endpoint: new URL('users/@me', context.$config.authApiUrl).href,
    });

    inject('auth', auth);
};
