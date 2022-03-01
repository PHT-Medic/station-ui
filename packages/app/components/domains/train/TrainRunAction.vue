<!--
  Copyright (c) 2021-2021.
  Author Peter Placzek (tada5hi)
  For the full copyright and license information,
  view the LICENSE file that was distributed with this source code.
  -->
<template>
    <div>
        <button
            class="btn btn-xs btn-primary"
            @click.prevent="show"
        >
            <slot name="text">
                <i class="fa fa-play" />
            </slot>
        </button>

        <b-modal
            ref="modal"
            title="Config"
            :ok-disabled="true"
            :button-size="'xs'"
        >
            <div class="alert alert-info alert-sm">
                Please select a config for the train to run with...
            </div>

            <train-config-list
                :train-id="trainId"
                @selected="handleSelected"
            />

            <div>
                <button
                    type="button"
                    class="btn btn-primary btn-xs"
                    :disabled="!configId"
                    @click.prevent="run"
                >
                    <i class="fa fa-ply" /> Run
                </button>
            </div>
        </b-modal>
    </div>
</template>
<script lang="ts">
import TrainConfigList from '../trrain-config/TrainConfigList.vue';

export default {
    components: { TrainConfigList },
    props: {
        trainId: String,
    },
    data() {
        return {
            busy: false,
            configId: null,
        };
    },
    methods: {
        handleSelected(id) {
            this.configId = id;
        },
        async show() {
            this.$refs.modal.show();
        },
        async run() {
            if (this.busy) return;

            this.busy = true;

            try {
                const train = await this.$stationApi.train.run(this.train.id, this.task);
                this.$emit('done', train);
            } catch (e) {
                this.$emit('failed', e);
            }

            this.busy = false;
        },
    },
};
</script>
