<!--
  - Copyright (c) 2021-2021.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script>
import { PermissionID } from '@authelion/common';
import { LayoutKey, LayoutNavigationID } from '../../../../config/layout';

export default {
    meta: {
        [LayoutKey.NAVIGATION_ID]: LayoutNavigationID.ADMIN,
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.REQUIRED_PERMISSIONS]: [PermissionID.PERMISSION_ADD],
    },
    methods: {
        handleCreated() {
            this.$router.push('/admin/permissions');
        },
    },
};
</script>
<template>
    <permission-form
        @created="handleCreated"
    />
</template>
