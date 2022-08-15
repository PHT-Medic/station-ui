<script lang="ts">
import Vue, { PropType } from 'vue';
import { ConfigurationState, LocalTrain } from '../../../domains/local-trains';
import FormHeader from './FormHeader.vue';
import MasterImageSelect from './MasterImageSelect.vue';

export default Vue.extend({
    name: 'LocalTrainForm',
    components: {
        MasterImageSelect,
        FormHeader,
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
            this.configurationState = 'fileConfiguration';
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
            this.configurationState = 'imageConfiguration';
            const response = await this.$stationApi.localTrain.create({
                name: this.formData.name,
            });
            this.formData = {
                ...response,
                id: response.id,
            };
        },

    },

});
</script>
<template>
    <div class="d-flex flex-fill flex-column">
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
                    :disabled="formData.name === ''"
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
    </div>
</template>
<style scoped>

</style>
