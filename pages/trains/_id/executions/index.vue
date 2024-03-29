<script lang="ts">
import { PropType } from 'vue';
import AirflowDAGRun from '../../../../components/domains/airflow/AirflowDAGRun.vue';
import TrainExecutions from '../../../../components/domains/train-executions/ExecutionList.vue';
import SummaryCards from '../../../../components/domains/train-executions/SummaryCards.vue';
import { Train } from '../../../../domains/train';

export default {
    components: {
        TrainExecutions,
        SummaryCards,
        AirflowDAGRun,
    },
    props: {
        entity: {
            type: Object as PropType<Train>,
            default: undefined,
        },
        selectedId: {
            type: String,
            default: undefined,
        },
    },
    data() {
        return {
            busy: false,
            executionId: undefined,
            dagRun: null,
            selectedExecution: null,
        };
    },
    computed: {
        status() {
            if (this.dagRun === null || this.selectedExecution === null) return 'failed';
            for (let i = 0; i < this.dagRun.tasklist.task_instances.length; i++) {
                if (this.dagRun.tasklist.task_instances[i].state !== 'success') {
                    return 'failed';
                }
            }
            return 'success';
        },
    },
    mounted() {
        this.initFromProps();
    },
    methods: {
        initFromProps() {
            this.busy = true;
            if (this.entity === undefined) return;
            if (this.selectedId === undefined) {
                [this.selectedExecution] = this.entity.executions;
            } else {
                this.executionId = this.selectedId;
                this.load_execution();
            }
            this.busy = false;
        },
        async load_execution() {
            if (this.busy) return;

            this.busy = true;

            try {
                this.dagRun = await this.$stationApi.train.getTrainExecution(this.executionId);
                const executions = await this.$stationApi.train.getExecutions(this.entity.train_id);
                [this.selectedExecution] = executions.filter((e) => e.airflow_dag_run === this.executionId);
            } catch (e) {
                if (e instanceof Error) {
                    this.$emit('failed', e);
                }
            }

            this.busy = false;
        },

        async handleSelect(executionId) {
            this.executionId = executionId;
            await this.load_execution();
        },
    },

};
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3">
                <train-executions
                    :train-id="entity.train_id"
                    @selected="handleSelect"
                />
            </div>
            <div
                v-if="selectedExecution !== null && dagRun !== null"
                class="col-9 execution-info"
            >
                <nuxt-child :entity="entity" />
                <!--                <div>-->
                <!--                    <summary-cards-->
                <!--                        :execution="selectedExecution"-->
                <!--                        :status="status"-->
                <!--                    />-->
                <!--                </div>-->
                <!--                <hr>-->
                <!--                <airflow-d-a-g-run-->
                <!--                    :entity="dagRun"-->
                <!--                />-->
            </div>
            <div
                v-else
                class="col-9"
            >
                <div
                    class="alert alert-sm alert-info"
                >
                    Select an execution to see the details.
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.execution-info {
    padding: 1rem;
    border-left: #7F828B 1px solid;
}
</style>
