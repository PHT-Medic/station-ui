<script lang="ts">
import Vue, { PropType } from 'vue';
import Plotly from 'plotly.js/dist/plotly';
import { TabularDatasetStatistics } from '../../../../../domains/datasets';

export default Vue.extend({
    name: 'ColumnSummary',
    props: {
        stats: {
            type: Object as PropType<TabularDatasetStatistics>,
            required: true,
        },
        selectedColumn: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            busy: false,
        };
    },
    computed: {
        plotData() {
            if (!this.selectedColumn) {
                return [];
            }
            const columnInfo = this.stats.column_information.filter((col) => col.title === this.selectedColumn)[0];
            console.log('plotData', columnInfo);
            console.log('plotData', this.stats);
            return columnInfo.figure;
        },
    },

    mounted() {
        // this.$plotly.newPlot('plot-container', this.plotData.fig_data.data, this.plotData.fig_data.layout);
    },
    methods: {
        displayPlot() {
            this.$plotly.newPlot('summary-plot-container', this.plotData.fig_data.data, this.plotData.fig_data.layout);
        },
    },
});
</script>
<template>
    <div class="d-flex flex-column">
        <div class="flex-row">
            Column summary {{ selectedColumn }}
        </div>
        <button
            class="btn btn-primary"
            @click="displayPlot"
        >
            plot
        </button>
        <div
            id="summary-plot-container"
        />
    </div>
</template>

<style scoped>

</style>
