<script lang="ts">
import { PropType } from 'vue';
import TrainExecutions from '../../../components/domains/train-executions/ExecutionList.vue';
import SummaryCards from '../../../components/domains/train-executions/SummaryCards.vue';
import { Train } from '../../../domains/train';

export default {
    components: {
        TrainExecutions,
        SummaryCards,
    },
    props: {
        entity: {
            type: Object as PropType<Train>,
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
            console.log('success', this.dagRun);
            if (this.dagRun === null || this.selectedExecution === null) return 'failed';
            for (let i = 0; i < this.dagRun.tasklist.task_instances.length; i++) {
                if (this.dagRun.tasklist.task_instances[i].state !== 'success') {
                    console.log('not success', this.dagRun.tasklist.task_instances[i].state);
                    return 'failed';
                }
            }
            console.log('success');
            return 'success';
        },
    },
    methods: {
        async load_execution() {
            if (this.busy) return;

            this.busy = true;

            try {
                this.dagRun = await this.$stationApi.train.getTrainExecution(this.executionId);
                const executions = await this.$stationApi.train.getExecutions(this.entity.train_id);
                console.log('executions', executions);
                this.selectedExecution = executions.filter((e) => e.airflow_dag_run === this.executionId)[0];
            } catch (e) {
                if (e instanceof Error) {
                    this.$emit('failed', e);
                }
            }

            this.busy = false;
        },

        async handleSelect(executionId) {
            console.log(executionId);
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
            <div class="col-9">
                <div v-if="selectedExecution !== null">
                    <summary-cards
                        :execution="selectedExecution"
                        :status="status"
                    />
                </div>
                <div
                    v-else
                    class="alert alert-sm alert-info"
                >
                    Select an execution to see the details.
                </div>
                <hr>
                {{ JSON.stringify(dagRun) }}
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
