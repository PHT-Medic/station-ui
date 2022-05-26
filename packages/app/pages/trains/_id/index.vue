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
    data() {
        return {
            busy: false,
            configId: null,
        };
    },
    methods: {
        handleUpdated(train) {
            this.$emit('updated', train);
        },
        handleFailed(e) {
            this.$emit('failed', e);
        },
        async run() {
            console.log('run', this.configId);
            if (this.busy) return;

            this.busy = true;

            try {
                const train = await this.$stationApi.train.run(this.train.train_id, { config_id: this.configId });
                console.log('train', train);
                this.$emit('done', train);
            } catch (e) {
                console.log('error', e);
                this.$emit('failed', e);
            }

            this.busy = false;
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
                <div>
                    <h6><i class="fas fa-play" /> Run</h6>
                    <div class="form-group">
                        <label for="config_id">Config ID</label>
                        <input
                            id="config_id"
                            v-model="configId"
                            type="text"
                            class="form-control"
                        >
                    </div>

                    <train-executions :train-id="entity.train_id" />
                </div>
            </div>
        </div>
    </div>
</template>
