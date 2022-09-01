<script lang="ts">
import Vue, { PropType } from 'vue';
import FileList from '../../shared/files/FileList.vue';
import { LocalTrain } from '../../../domains/local-trains';

export default Vue.extend({
    name: 'LocalTrainFiles',
    components: {
        FileList,
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
        };
    },
    mounted() {
        console.log('props', this.train);
        Promise.resolve().then(() => {
            this.load();
        });
    },

    methods: {
        async load() {
            this.busy = true;
            const response = await this.$stationApi.localTrain.getFiles(this.train.id);
            this.files = response;
            this.busy = false;
        },
        async uploadFiles(files) {
            console.log('uploadFiles', files);
            const formData = new FormData();
            for (const file of files) {
                console.log('file', file);
                formData.append('files', file);
            }
            // files.forEach((f) => {
            //     formData.append('files', f);
            // });
            console.log('uploadFiles', files);
            this.busy = true;
            const response = await this.$stationApi.localTrain.addFiles(this.train.id, formData);
            console.log('uploadFiles response', response);
            this.files = response;
            this.busy = false;
        },
        handleRemove(file) {
            this.busy = true;
            this.$stationApi.localTrain.deleteFile(this.train.id, file.file_name)
                .then(() => {
                    this.load();
                })
                .catch((e) => {
                    this.$emit('failed', e);
                }).then(() => {
                    this.busy = false;
                });
        },
        viewFile(file) {
            console.log('viewFile', file);
            this.$emit('view-file', file);
        },
        handleNext() {
            console.log('handleNext file list', this.entrypoint);
            this.$emit('filesConfigured', this.entrypoint);
        },
        handleBack() {
            this.$emit('back');
        },
    },
});

</script>

<template>
    <div class="container-fluid col">
        <file-list
            :files="files"
            @uploadFiles="uploadFiles"
        >
            <template #default="slotProps">
                <b-form-checkbox
                    :id="slotProps.file.file_name"
                    v-model="entrypoint"
                    :value="slotProps.file.full_path"
                    unchecked-value=""
                    :checked="slotProps.file.full_path === entrypoint"
                >
                    Entrypoint {{ slotProps.file.full_path }}
                </b-form-checkbox>
                <button
                    type="button"
                    class="btn btn-xs btn-primary"
                    @click.prevent="viewFile(slotProps.file)"
                >
                    <i class="fas fa-eye" />
                </button>
                <button
                    type="button"
                    class="btn btn-xs btn-danger"
                    @click.prevent="handleRemove(slotProps.file)"
                >
                    <i class="fas fa-trash" />
                </button>
            </template>
        </file-list>
        <div class="container row justify-content-between mt-2">
            <button
                class="btn btn-primary"
                @click.prevent="handleBack"
            >
                Previous
            </button>
            <button
                class="btn btn-primary"
                :disabled="busy"
                @click.prevent="handleNext"
            >
                Next
            </button>
        </div>
    </div>
</template>

<style scoped>

</style>
