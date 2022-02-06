/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { HTTPClient as CentralHTTPClient } from '@personalhealthtrain/ui-common';
import { HTTPClient as AuthHTTPClient } from '@typescript-auth/domains';

declare module '*.vue' {
    import Vue from 'vue';

    export default Vue;
}

declare module 'vue/types/vue' {
    // Global properties can be declared
    // on the `VueConstructor` interface
    interface VueConstructor {
        $authApi: AuthHTTPClient,
        $centralApi: CentralHTTPClient
    }
}
