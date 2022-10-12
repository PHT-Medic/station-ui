<script lang="ts">
import Vue, { PropType } from 'vue';
import { TabularDatasetStatistics } from '../../../../../domains/datasets';
import ColumnSideBar from './ColumnSideBar.vue';
import Plotly from 'plotly.js';
import ColumnSummary from "./ColumnSummary.vue";

export default Vue.extend({
    name: 'TabularSummary',
    components: {ColumnSummary, ColumnSideBar },
    props: {
        stats: {
            type: Object as PropType<TabularDatasetStatistics>,
            required: true,
        },
    },
    data() {
        return {
            busy: false,
            selectedColumn: null,
        };
    },
    methods: {
        onColumnSelect(column: string) {
            console.log('onColumnSelect', column);
            this.selectedColumn = column;
        },
    },
});
</script>

<template>
    <div class="container-fluid row h-100">
        <div class="col-3">
            <column-side-bar
                :stats="stats"
                @columnSelect="onColumnSelect"
            />
        </div>
        <div class="col">
            <column-summary
                :stats="stats"
                :selectedColumn="selectedColumn"
            />
        </div>
    </div>
</template>

<style scoped>

</style>
