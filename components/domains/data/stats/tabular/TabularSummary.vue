<script lang="ts">
import Vue, { PropType } from 'vue';
import { TabularDatasetStatistics } from '../../../../../domains/datasets';
import ColumnSideBar from './ColumnSideBar.vue';

export default Vue.extend({
    name: 'TabularSummary',
    components: { ColumnSideBar },
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
});
</script>

<template>
    <div class="container-fluid row h-100">
        <div class="col-3">
            <column-side-bar :stats="stats" />
        </div>
        <div class="col">
            Column Summary
        </div>
    </div>
</template>

<style scoped>

</style>
