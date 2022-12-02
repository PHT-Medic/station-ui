<script lang="ts">
import { PropType } from 'vue';
import AirflowDAGRun from '../../../../../components/domains/airflow/AirflowDAGRun.vue';
import { AirflowDagRun } from '../../../../../domains/airflow';
import { Train } from '../../../../../domains/train';

export default {
    components: { AirflowDAGRun },
    props: {
        entity: {
            type: Object as PropType<AirflowDagRun>,
            default: undefined,
        },
        train: {
            type: Object as PropType<Train>,
            default: undefined,
        },
    },
    data() {
        return {
            busy: false,
            item: null,
            runId: null,
        };
    },
};
</script>

<template>
    <div class="d-flex flex-grow-1">
        <airflow-d-a-g-run :entity="entity" />
    </div>
</template>

<style scoped>

</style>
