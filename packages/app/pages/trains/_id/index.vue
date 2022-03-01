<!--
  Copyright (c) 2021-2021.
  Author Peter Placzek (tada5hi)
  For the full copyright and license information,
  view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">

import { PropType } from 'vue';
import TrainForm from '../../../components/domains/train/TrainForm.vue';
import { Train } from '../../../domains/train';
import TrainExecutions from '../../../components/domains/train/TrainExecutions.vue';

export default {
    components: { TrainExecutions, TrainForm },
    props: {
        entity: {
            type: Object as PropType<Train>,
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
        <div class="row">
            <div class="col">
                <h6><i class="fa fa-bars" /> General</h6>
                <train-form
                    :entity="entity"
                    @updated="handleUpdated"
                />
            </div>
            <div class="col">
                <train-executions :train-id="entity.train_id" />
            </div>
        </div>
    </div>
</template>
