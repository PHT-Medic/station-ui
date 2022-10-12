<script lang="ts">
import Vue, { PropType } from 'vue';
import { TabularDatasetStatistics } from '../../../../../domains/datasets';

export default Vue.extend({
    name: 'ColumnSideBar',
    props: {
        stats: {
            type: Object as PropType<TabularDatasetStatistics>,
            required: true,
        },
    },
});
</script>

<template>
    <div
        id="side-bar-container"
        class="d-flex flex-column px-2"
    >
        <button
            v-for="col in stats.column_information"
            :key="col.title"
            type="button"
            class="btn btn-outline-dark"
        >
            <div
                class="d-flex flex-row align-content-center justify-content-start"
            >
                <i
                    v-if="col.type === 'categorical'"
                    class="fa fa-ballot-check"
                />
                <i
                    v-else-if="col.type === 'numeric'"
                    class="fa fa-hashtag"
                />
                <i
                    v-else
                    class="fa fa-question"
                />
                <span
                    class="ml-2"
                >
                    {{ col.title }}
                </span>
            </div>
        </button>
    </div>
</template>

<style scoped>

#side-bar-container {
    overflow-y: scroll;
    background-color: #ede8ef;
}

</style>
