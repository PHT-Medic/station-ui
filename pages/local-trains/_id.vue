<script lang="ts">
import Vue from 'vue';
import TrainName from '../../components/domains/train/TrainName.vue';
import FileList from '../../components/shared/files/FileList.vue';
import LocalTrainOverviewCard from '../../components/domains/local-train/LocalTrainOverviewCard.vue';
import TrainConfigList from '../../components/domains/train-config/TrainConfigList.vue';
import DatasetList from '../../components/domains/data/dataset/DatasetList.vue';
import LocalTrainRun from '../../components/domains/local-train/LocalTrainRun.vue';

export default Vue.extend({
    components: {
        TrainName,
        FileList,
        LocalTrainOverviewCard,
        TrainConfigList,
        DatasetList,
        LocalTrainRun,
    },
    async asyncData(ctx) {
        const { id } = ctx.params;

        if (id.length < 3) {
            await ctx.redirect('/');
            return {

            };
        }
        const trainData = await ctx.$stationApi.localTrain.get(id).then(
            (response) => response,
            (error) => {
                if (error.response.status === 404) {
                    ctx.redirect('/local-trains');
                }
                return null;
            },
        );
        const trainFiles = await ctx.$stationApi.localTrain.getFiles(id).then(
            (response) => response,
            (error) => {
                if (error.response.status === 404) {
                    ctx.redirect('/local-trains');
                }
                return null;
            },
        );
        let config = null;
        if (trainData.config_id !== null || trainData.config_id) {
            config = ctx.$stationApi.configuration.getOne(trainData.config_id);
        }

        let dataset = null;
        console.log('trainData.dataset_id', trainData.dataset_id);
        if (trainData.dataset_id !== null || trainData.dataset_id) {
            dataset = ctx.$stationApi.datasets.get(trainData.config_id);
        }

        return {
            id,
            train: trainData,
            files: trainFiles,
            config,
            dataset,
        };
    },
    data() {
        return {
            id: null,
            train: null,
            files: [],
            configEdit: false,
            dataEdit: false,
            configId: null,
            datasetId: null,
            config: null,
            dataset: null,
        };
    },
    methods: {
        async handleConfigSelected(config) {
            console.log('Config selected', config);
            this.configEdit = false;
            this.configId = config;
            this.$stationApi.localTrain.update(this.id, {
                config_id: config,
            }).then(
                (response) => {
                    console.log(response);
                    this.train = response;
                },
                (error) => {
                    console.log('Error', error);
                },
            );
            this.config = await this.$stationApi.trainConfig.get(config);
        },
        handleDatasetSelected(dataset) {
            console.log('Dataset selected', dataset);
            console.log(dataset.target.value);
            this.datasetId = dataset.target.value;
            this.$emit('selected', dataset.target.value);
            this.dataEdit = false;
            this.$stationApi.localTrain.update(this.id, {
                dataset_id: dataset.target.value,
            }).then(
                (response) => {
                    console.log(response);
                    this.train = response;
                },
                (error) => {
                    console.log('Error', error);
                },
            );
            this.$stationApi.datasets.get(dataset.target.value).then(
                (response) => {
                    this.dataset = response;
                },
                (error) => {
                    console.log('Error', error);
                },
            );
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
    <div class="container-fluid col">
        <h1 class="title no-border mb-3">
            🚊 Local Train
            <span class="sub-title">
                <train-name
                    :train-id="train.id"
                    :train-name="train.name"
                />
            </span>
        </h1>
        <hr>
        <div class="row">
            <div class="col">
                <local-train-overview-card :train="train" />

                <div class="card mt-4">
                    <div class="card-header">
                        <h4 class="card-title">
                            <div class="d-flex flex-row justify-content-between">
                                <div>
                                    Configuration
                                </div>
                                <button
                                    class="btn btn-sm btn-outline-secondary"
                                    @click="configEdit = !configEdit"
                                >
                                    <i class="fas fa-edit" />
                                </button>
                            </div>
                        </h4>
                    </div>
                    <div class="card-body">
                        <div
                            v-if="configEdit"
                            class="col"
                        >
                            <h5>Select configuration</h5>
                            <train-config-list
                                :train-id="train.id"
                                @selected="handleConfigSelected"
                            />
                        </div>
                    </div>
                </div>
                <div class="card mt-4">
                    <div class="card-header">
                        <h4 class="card-title">
                            <div class="d-flex flex-row justify-content-between">
                                <div>
                                    Data
                                </div>
                                <button
                                    class="btn btn-sm btn-outline-secondary"
                                    @click="dataEdit = !dataEdit"
                                >
                                    <i class="fas fa-edit" />
                                </button>
                            </div>
                        </h4>
                    </div>
                    <div class="card-body">
                        <div
                            v-if="dataEdit"
                            class="col"
                        >
                            <h5>Select dataset</h5>
                            <dataset-list
                                :with-header="false"
                            >
                                <template #items="{items}">
                                    <select
                                        class="form-control"
                                        @change.prevent="handleDatasetSelected"
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
                        <div
                            v-else
                        >
                            {{ dataset.id }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <local-train-run
                    :train="train"
                    :config-id="configId"
                    :dataset-id="datasetId"
                />
                <file-list
                    :files="files"
                />
            </div>
        </div>
    </div>
</template>
