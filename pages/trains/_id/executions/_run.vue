<script lang="ts">

import { PropType } from 'vue';
import AirflowDAGRun from '../../../../components/domains/airflow/AirflowDAGRun.vue';
import { LayoutKey, LayoutNavigationID } from '../../../../config/layout';
import { Train } from '../../../../domains/train';
import TrainExecutions from '../../../../components/domains/train-executions/ExecutionList.vue';

export default {
    meta: {
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.NAVIGATION_ID]: LayoutNavigationID.DEFAULT,
    },
    components: {
        AirflowDAGRun,
        TrainExecutions,
    },
    props: {
        entity: {
            type: Object as PropType<Train>,
            default: undefined,
        },
    },
    async asyncData(context) {
        try {
            console.log('context.params.run', context.params.run, context.params.id);
            const runId = context.params.run;
            const item = await context.$stationApi.train.getTrainExecution(runId);
            console.log('item', item);

            return {
                item,
                runId,
            };
        } catch (e) {
            console.log(e);
            await context.redirect('/trains');

            return {

            };
        }
    },
    data() {
        return {
            item: null,
            runId: null,

        };
    },
};
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3">
                <train-executions
                    :train-id="entity.train_id"
                />
            </div>
            <div
                class="col-9 execution-info"
            >
<!--                <nuxt-child-->
<!--                    :train="entity"-->
<!--                />-->
                <airflow-d-a-g-run :entity="item" />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
