<script lang="ts">
import Vue, { PropType } from 'vue';
import { ConfigurationState, LocalTrain } from '../../../domains/local-trains';
import FormHeader from './FormHeader.vue';
import MasterImageSelect from './MasterImageSelect.vue';
import LocalTrainFiles from './LocalTrainFiles.vue';
import LocalTrainRunConfig from './LocalTrainRunConfig.vue';

export default Vue.extend({
    name: 'LocalTrainForm',
    components: {
        MasterImageSelect,
        FormHeader,
        LocalTrainFiles,
        LocalTrainRunConfig,
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
            masterImages: [],
            formData: {},
            configurationState: 'base',
            trainFiles: [],
        };
    },
    mounted() {
        this.loadProps();
    },
    methods: {
        async handleImageSelect(selectedImage) {
            this.formData.master_image_id = selectedImage.masterImageId;
            this.formData.custom_image = selectedImage.customImage;
            console.log(this.formData);
            const response = await this.$stationApi.localTrain.update(this.formData.id, { ...this.formData });
            this.formData = {
                ...response,
                id: response.id,
            };
            this.configurationState = 'filesConfiguration';
        },

        loadProps() {
            if (this.train === undefined) {
                this.formData = {
                    name: '',
                    id: '',
                    description: '',
                    master_image_id: null,
                    custom_image: '',
                    files: [],
                    entrypoint: '',
                };
                this.state = 'base';
            } else {
                console.log('props', this.train);
                this.formData = {
                    ...this.train,
                };
                this.configurationState = this.train.state.configuration_state;
            }
            console.log(this.formData);
        },
        async handleNameConfigured() {
            this.busy = true;
            if (this.formData.id) {
                this.configurationState = 'imageConfiguration';
            } else {
                const response = await this.$stationApi.localTrain.create({
                    name: this.formData.name,
                });
                this.formData = {
                    ...response,
                    id: response.id,
                };
                this.busy = false;
                this.configurationState = 'imageConfiguration';
            }
        },

        async handleUploadFiles(files) {
            const response = await this.$stationApi.localTrain.addFiles(this.formData.id, files);
            this.trainFiles = response.files;
        },

        async handleFilesConfigured(entrypoint) {
            this.busy = true;
            this.configurationState = 'runConfiguration';
            this.formData.entrypoint = entrypoint;
            const response = await this.$stationApi.localTrain.update(this.formData.id, { ...this.formData });
            this.formData = {
                ...response,
                id: response.id,
            };
        },

    },

});
</script>
<template>
    <div class="d-flex flex-fill flex-column min-vh-100">
        <form-header
            :step="configurationState"
            :name="formData.name"
        />
        <div
            v-if="configurationState === 'base'"
            class="container-fluid"
        >
            <b-form-group
                id="label-name"
                label="Enter a name for the local train."
                label-for="custom-image"
                label-size="sm"
            >
                <b-form-input
                    id="train-name"
                    v-model="formData.name"
                />
            </b-form-group>
            <div class="container row justify-content-end">
                <button
                    class="btn btn-primary"
                    :disabled="formData.name === '' && !busy"
                    @click="handleNameConfigured"
                >
                    Next
                </button>
            </div>
        </div>
        <master-image-select
            v-if="configurationState === 'imageConfiguration'"
            @imageSelected="handleImageSelect"
            @back="configurationState = 'base'"
        />
        <local-train-files
            v-if="configurationState === 'filesConfiguration'"
            :train="formData"
            @uploadFiles="handleUploadFiles"
            @filesConfigured="handleFilesConfigured"
            @back="configurationState = 'imageConfiguration'"
        />
        <local-train-run-config
            v-if="configurationState === 'runConfiguration'"
            :train="formData"
            @back="configurationState = 'filesConfiguration'"
        >
        </local-train-run-config>
    </div>
</template>
<style scoped>

</style>
