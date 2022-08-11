<script lang="ts">
import { PropType } from 'vue';
import { AirflowDagRun } from '../../../domains/airflow';
import TaskList from './TaskList.vue';
import TaskStatusOverview from './TaskStatusOverview.vue';

export default {
    name: 'AirflowDAGRun',
    components: {
        TaskStatusOverview,
        TaskList,
    },
    props: {
        entity: {
            type: Object as PropType<AirflowDagRun>,
            required: true,
        },

    },
};
</script>
<template>
    <div class="container text-center">
        <task-status-overview :entity="entity.tasklist" />
        <task-list :dag-run="entity" />
    </div>
</template>

<style scoped>

</style>
