/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { HTTPClient as CentralHTTPClient } from '@personalhealthtrain/central-common';
import { HTTPClient as AuthHTTPClient } from '@authelion/common';
import { Adapter } from 'browser-storage-adapter';
import AuthModule from '../config/auth';
import { HTTPClient as StationHTTPClient } from '../config/http/client';

declare module 'vuex/types/index' {
    interface Store<S> {
        $api: CentralHTTPClient,
        $authApi: AuthHTTPClient,
        $stationApi: StationHTTPClient,

        $auth: AuthModule,

        $warehouse: Adapter,
        $authWarehouse: Adapter
    }
}
