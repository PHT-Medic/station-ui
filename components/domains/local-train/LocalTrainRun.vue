<script lang="ts">
import Vue, { PropType } from 'vue';
import { AirflowDagRun } from '../../../domains/airflow';
import { LocalTrain } from '../../../domains/local-trains';

export default Vue.extend({
    name: 'LocalTrainRun',
    props: {
        train: {
            type: Object as PropType<LocalTrain>,
            required: true,
        },
        datasetId: {
            type: String,
        },
        configId: {
            type: String,
        },
    },
    methods: {
        async run() {
            console.log('Run', this.datasetId, this.configId);
            const response = await this.$stationApi.localTrain.run(this.train.id, this.configId, this.datasetId);
            console.log('Run response', response);
            this.$emit('run', {
                datasetId: this.datasetId,
                configId: this.configId,
            });
        },
    },
});
</script>

<template>
    <div
        class="d-flex flex-row justify-content-end"
    >
        <button
            class="btn btn-primary"
            @click="run"
        >
            <span class="icon">
                <i class="fas fa-play" />
            </span>
            <span>Run</span>
        </button>
    </div>
</template>

<style scoped>

</style>
