<script lang="ts">
import { PropType } from 'vue';
import DatasetFileList from '../../../../components/shared/files/FileList.vue';
import { Dataset } from '../../../../domains/datasets/type';
import { MinioFile } from '../../../../domains/files/type';

export default {
    components: {
        DatasetFileList,
    },
    props: {
        entity: {
            type: Object as PropType<Dataset>,
            required: true,
        },
        files: {
            type: Array as PropType<MinioFile[]>,
            required: true,
        },

    },
    data() {
        return {
            busy: false,
        };
    },
    methods: {
        async submit() {
            if (this.busy) return;

            this.busy = true;
            try {
                await this.$store.dispatch('datasets/update', this.entity);
                this.$emit('success');
            } catch (e) {
                this.$emit('error', e);
            } finally {
                this.busy = false;
            }
        },
        async drop(file: MinioFile) {
            await this.$stationApi.datasets.deleteFile(this.entity.id, file.full_path);
            this.$emit('updated', this.entity.id);
        },
    },
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="d-flex flex-column">
                    <span>
                        <b>Dataset ID:</b> {{ entity.id }}
                    </span>
                </div>
            </div>
            <div class="col">
                <dataset-file-list
                    :files="files"
                    @removeFile="drop"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
