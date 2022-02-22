/*
 * Copyright (c) 2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { PermissionID as CentralPermissionID } from '@personalhealthtrain/central-common';

export enum PermissionKey {

}

export const PermissionID = {
    ...PermissionKey,
    ...CentralPermissionID,
};
