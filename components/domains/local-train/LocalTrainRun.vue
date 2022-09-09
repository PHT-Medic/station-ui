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
    data() {
        return {
            busy: false,
            commandEdit: false,
            command: '',
            commandArgsEdit: '',
            commandArgs: '',
        };
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
        class="d-flex flex-row justify-content-between mb-4"
    >
        <div
            class="d-flex flex-column align-items-center"
        >
            <h6>
                Command
                <button
                    class="btn btn-sm btn"
                    @click="commandEdit = !commandEdit"
                >
                    <i class="fas fa-edit" />
                </button>
            </h6>
            <div
                v-if="commandEdit"
            >
                <input
                    v-model="command"
                    type="text"
                    class="form-control"
                    :placeholder="train.command"
                >
            </div>
            <div
                v-else
            >
                <span>{{ train.command }}</span>
            </div>
        </div>
        <div
            class="d-flex flex-column align-items-center"
        >
            <h6>
                Command Arguments
                <button
                    class="btn btn-sm btn"
                    @click="commandArgsEdit = !commandArgsEdit"
                >
                    <i class="fas fa-edit" />
                </button>
            </h6>
            <div
                v-if="commandArgsEdit"
            >
                <input
                    v-model="commandArgs"
                    type="text"
                    class="form-control"
                    :placeholder="train.command_args"
                >
            </div>
            <div
                v-else
            >
                <span>{{ train.command_args }}</span>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-end">
            <button
                class="btn btn-warning mr-2"
                @click="run"
            >
                <span class="icon">
                    <i class="fas fa-tools" />
                </span>
                <span>Rebuild</span>
            </button>
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
    </div>
</template>

<style scoped>

</style>
