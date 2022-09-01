<script lang="ts">
import Vue, { PropType } from 'vue';
import { LocalTrain } from '../../../domains/local-trains';
import TrainConfigList from '../train-config/TrainConfigList.vue';
import DatasetList from '../data/dataset/DatasetList.vue';

export default Vue.extend({
    name: 'LocalTrainFiles',
    components: {
        TrainConfigList,
        DatasetList,
    },
    props: {
        train: {
            type: Object as PropType<LocalTrain>,
            default: undefined,
        },
    },
    data() {
        return {
            busy: false,
            files: [],
            entrypoint: '',
            datasetId: '',
        };
    },
    methods: {
        handleConfigSelected(config) {
            console.log('Config selected', config);
        },
        buildAndRun() {
            console.log('Build and run');
            this.$router.push({
                path: `/local-trains/${this.train.id}`,
            });
        },
    },
});
</script>

<template>
    <div class="container-fluid col p-0 mr-0">
        <h2>
            Run Configuration
        </h2>
        <div class="container-fluid row p-0 m-0">
            <div class="container-fluid col">
                <h5>
                    Select train config
                </h5>
                <train-config-list
                    :train-id="train.id"
                    @selected="handleConfigSelected"
                />
            </div>
            <div class="col">
                <h5>
                    Select dataset
                </h5>
                <dataset-list :with-header="false">
                    <template #items="{items}">
                        <select
                            v-model="datasetId"
                            class="form-control"
                        >
                            <option value="">
                                -- Please select --
                            </option>
                            <option
                                v-for="(item,key) in items"
                                :key="key + 1"
                                :value="item.id"
                            >
                                {{ item.name }}
                            </option>
                        </select>
                    </template>
                </dataset-list>
            </div>
        </div>
        <div class="container row justify-content-between pr-0">
            <button
                class="btn btn-primary"
                @click.prevent="$emit('back')"
            >
                Previous
            </button>
            <div class="flex-row">
                <button
                    class="btn btn-success"
                    :disabled="busy"
                    @click.prevent="buildAndRun"
                >
                    Build and run
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
