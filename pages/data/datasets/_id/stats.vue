<script lang="ts">
import Vue, { PropType } from 'vue';
import { Dataset } from '../../../../domains/datasets';
import { MinioFile } from '../../../../domains/files/type';
import FileSelect from '../../../../components/shared/files/FileSelect.vue';
import TabularSummary from "../../../../components/domains/data/stats/tabular/TabularSummary.vue";

export default Vue.extend({
    name: 'Stats',
    components: {TabularSummary, FileSelect },
    props: {
        entity: {
            type: Object as PropType<Dataset>,
            required: true,
        },
        files: {
            type: Array as PropType<MinioFile[]>,
            required: false,
        },
    },
    data: () => ({
        busy: false,
        selectedFile: null,
        summary: null,
    }),
    methods: {
        async onFileSelect(file: string) {
            this.selectedFile = file;
            this.busy = true;
            this.summary = await this.$stationApi.datasets.getFileSummary(this.entity.id, file);
            this.busy = false;
        },
    },
});
</script>

<template>
    <div class="d-flex flex-column">
        <h5>Select a file</h5>
        <div>
            <file-select
                :files="files"
                @fileSelect="onFileSelect"
            />
        </div>
        <div v-if="busy" class="d-flex flex-grow-1">
            <div class="alert alert-sm alert-info d-flex flex-grow-1">
                Loading...
            </div>
        </div>
        <div
            v-if="!busy && summary"
        >
            <tabular-summary :stats="summary" />
        </div>
    </div>
</template>

<style scoped>

</style>
