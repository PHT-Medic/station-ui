<!--
  Copyright (c) 2021-2021.
  Author Peter Placzek (tada5hi)
  For the full copyright and license information,
  view the LICENSE file that was distributed with this source code.
  -->
<script>
import { LayoutKey, LayoutNavigationID } from '../../../../config/layout/contants';

export default {
    props: {
        entity: {
            type: Object,
        },
    },
    meta: {
        [LayoutKey.NAVIGATION_ID]: LayoutNavigationID.ADMIN,
    },
    methods: {
        handleSelected(item) {
            this.$emit('updated', item);
        },
    },
};
</script>
<template>
    <div>
        <role-form
            :entity="entity"
            @updated="handleUpdated"
        />
    </div>
</template>
