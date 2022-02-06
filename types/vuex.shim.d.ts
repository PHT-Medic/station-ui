/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { HTTPClient as CentralHTTPClient } from '@personalhealthtrain/ui-common';
import { HTTPClient as AuthHTTPClient } from '@typescript-auth/domains/dist/http/client/module';
import AuthModule from '../config/auth';

declare module 'vuex/types/index' {
    interface Store<S> {
        $api: CentralHTTPClient,
        $authApi: AuthHTTPClient,
        $auth: AuthModule
    }
}
