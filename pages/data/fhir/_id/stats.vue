<script lang="ts">
import { Context } from '@nuxt/types';
import { PropType } from 'vue';
import { FHIRServer } from '../../../../domains/fhir';
import Plotly from 'plotly.js';

export default {
    props: {
        entity: {
            type: Object as PropType<FHIRServer>,
            required: true,
        },
    },
    async asyncData(context) {
        try {
            const statistics = await context.$stationApi.fhir.stats(context.params.id);
            return {
                statistics,
            };
        } catch (e) {
            await context.redirect(`/data/fhir/${context.params.id}`);

            return {

            };
        }
    },
    data() {
        return {
            statistics: null,
        };
    },
    mounted() {
        this.displayPlot();
    },
    methods: {
        displayPlot() {
            this.$plotly.newPlot('summary-plot-container', this.statistics.figure.data, this.statistics.figure.layout);
        },
    },
};
</script>

<template>
    <div>
        <div id="summary-plot-container" />
    </div>
</template>

<style scoped>

</style>
