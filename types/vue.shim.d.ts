/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { HTTPClient as CentralHTTPClient } from '@personalhealthtrain/central-common';
import { HTTPClient as AuthHTTPClient } from '@authup/common';
import { Ilingo } from 'ilingo';
import { Adapter } from 'browser-storage-adapter';
import { HTTPClient as StationHTTPClient } from '../config/http/client';
import AuthModule from '../config/auth';

declare module '*.vue' {
    import Vue from 'vue';

    export default Vue;
}

declare module 'vue/types/vue' {
    // Global properties can be declared
    // on the `VueConstructor` interface
    interface VueConstructor {
        $api: CentralHTTPClient,
        $authApi: AuthHTTPClient,
        $stationApi: StationHTTPClient,

        $auth: AuthModule,
        $ilingo: Ilingo,

        $store: Store<any>,

        $warehouse: Adapter,
        $authWarehouse: Adapter
    }

    interface Vue {
        $api: CentralHTTPClient,
        $authApi: AuthHTTPClient,
        $stationApi: StationHTTPClient,

        $auth: AuthModule,
        $ilingo: Ilingo,

        $store: Store<any>,

        $warehouse: Adapter,
        $authWarehouse: Adapter
    }
}
