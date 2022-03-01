<!--
  Copyright (c) 2021-2021.
  Author Peter Placzek (tada5hi)
  For the full copyright and license information,
  view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">

import { PropType } from 'vue';
import { Configuration } from '../../../domains/config';
import ConfigForm from '../../../components/domains/config/ConfigForm.vue';

export default {
    components: { ConfigForm },
    props: {
        entity: {
            type: Object as PropType<Configuration>,
            default: undefined,
        },
    },
    methods: {
        handleUpdated(train) {
            this.$emit('updated', train);
        },
        handleFailed(e) {
            this.$emit('failed', e);
        },
    },
};
</script>

<template>
    <div>
        <h6><i class="fa fa-bars" /> General</h6>
        <config-form
            :entity="entity"
            @updated="handleUpdated"
        />
    </div>
</template>
