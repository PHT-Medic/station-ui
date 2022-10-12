<script lang="ts">
import Vue, {PropType} from 'vue';
import {TabularDatasetStatistics} from '../../../../../domains/datasets';

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
                return null;
            }
            const columnInfo = this.stats.column_information.filter((col) => col.title === this.selectedColumn)[0];
            return columnInfo.figure;
        },
        columnData() {
            if (!this.selectedColumn) {
                return null;
            }
            return this.stats.column_information.filter((col) => col.title === this.selectedColumn)[0];
        },
    },
    watch: {
        selectedColumn() {
            this.displayPlot();
        },
    },

    mounted() {
        if (this.selectedColumn) {
            this.$plotly.newPlot('summary-plot-container', this.plotData.fig_data.data, this.plotData.fig_data.layout);
        }
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
        <div
            v-if="selectedColumn"
        >
            <h4
                class="text-center"
            >
                {{ selectedColumn }}
            </h4>
            <div
                v-if="columnData.type === 'numeric'"
                class="d-flex flex-row justify-content-center"
            >
                <div>
                    Type:
                    <span class="font-weight-bold"> {{ columnData.type }} </span>
                </div>
                <div
                    class="ml-4"
                >
                    Mean:
                    <span class="font-weight-bold"> {{ columnData.mean }} </span>
                </div>
                <div
                    class="ml-4"
                >
                    Std:
                    <span class="font-weight-bold"> {{ columnData.std }} </span>
                </div>
                <div
                    class="ml-4"
                >
                    Min:
                    <span class="font-weight-bold"> {{ columnData.min }} </span>
                </div>
                <div
                    class="ml-4"
                >
                    Max:
                    <span class="font-weight-bold"> {{ columnData.max }} </span>
                </div>
            </div>
            <div
                v-else-if="columnData.type === 'categorical'"
                class="d-flex flex-row justify-content-center"
            >
                <div>
                    Type:
                    <span class="font-weight-bold"> {{ columnData.type }} </span>
                </div>
                <div
                    class="ml-4"
                >
                    Num categories:
                    <span class="font-weight-bold"> {{ columnData.number_categories }} </span>
                </div>
                <div
                    class="ml-4"
                >
                    Most frequent:
                    <span class="font-weight-bold"> {{ columnData.most_frequent_element }} </span>
                </div>
                <div
                    class="ml-4"
                >
                    Frequency:
                    <span class="font-weight-bold"> {{ columnData.frequency }} </span>
                </div>
            </div>
            <div
                v-else
            >
                <div>
                    Hello:
                    <span class="font-weight-bold"> {{ columnData.type }} </span>
                </div>
            </div>
        </div>
        <div
            class="p-2"
        >
            <div
                id="summary-plot-container"
            />
        </div>
    </div>
</template>

<style scoped>

</style>
