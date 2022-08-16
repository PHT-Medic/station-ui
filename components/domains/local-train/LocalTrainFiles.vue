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
            this.files = response;
            this.busy = false;
        },
    },
});

</script>

<template>
    <div class="container-fluid col">
        <file-list
            :files="files"
            @uploadFiles="uploadFiles"
        />
        <div class="container row justify-content-between mt-2">
            <button class="btn btn-primary">
                Previous
            </button>
            <button
                class="btn btn-primary"
            >
                Next
            </button>
        </div>
    </div>
</template>

<style scoped>

</style>
