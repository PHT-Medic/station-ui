<script lang="ts">
import { PropType } from 'vue';
import TrainExecutions from '../../../components/domains/train-executions/ExecutionList.vue';
import { Train } from '../../../domains/train';

export default {
    components: {
        TrainExecutions,
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
            dagRun: undefined,
        };
    },
    computed: {
        success() {
            if (this.dagRun === undefined) return false;
            console.log(' computing success', this.dagRun.task_list.task_instances);
            console.log(this.dagRun);
            // const failed = this.dagRun.task_list.task_instances.some((task) => task.state === 'failed');
            // return !failed;
            return true;
        },
    },
    methods: {
        async load_execution() {
            if (this.busy) return;

            this.busy = true;

            try {
                this.dagRun = await this.$stationApi.train.getTrainExecution(this.executionId);
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
                Execution details
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
