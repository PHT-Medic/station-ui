<!--
  Copyright (c) 2021-2021.
  Author Peter Placzek (tada5hi)
  For the full copyright and license information,
  view the LICENSE file that was distributed with this source code.
  -->
<script>
import { PermissionID } from '@personalhealthtrain/central-common';
import { LayoutKey, LayoutNavigationID } from '../../../../config/layout/contants';

export default {
    meta: {
        meta: {
            [LayoutKey.NAVIGATION_ID]: LayoutNavigationID.ADMIN,
            [LayoutKey.REQUIRED_LOGGED_IN]: true,
            [LayoutKey.REQUIRED_PERMISSIONS]: [
                PermissionID.ROLE_ADD,
            ],
        },
    },
    methods: {
        handleRoleCreated(e) {
            this.$router.push(`/admin/roles/${e.id}`);
        },
    },
};
</script>
<template>
    <role-form
        @created="handleRoleCreated"
    />
</template>
