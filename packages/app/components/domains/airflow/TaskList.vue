<script lang="ts">
import { PropType } from 'vue';
import { AirflowDagRun, TaskLog } from '../../../domains/airflow';
import TaskListItem from './TaskListItem.vue';

export default {
    name: 'TaskList',
    components: {
        TaskListItem,
    },
    props: {
        dagRun: {
            type: Object as PropType<AirflowDagRun>,
            default: undefined,
        },
        dagId: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            busy: false,
            logs: [],
            open: [],
        };
    },
    computed: {
        sortedTasks() {
            if (this.dagRun === undefined) return [];
            const sorted = this.dagRun.tasklist.task_instances.sort((a, b) => {
                if (a.start_date < b.start_date) return -1;
                if (a.start_date > b.start_date) return 1;
                return 0;
            });
            return sorted;
        },
    },
    methods: {
        async getLogs(taskId) {
            if (this.busy) return;
            this.busy = true;
            const stored = this.logs.find((l) => l.taskId === taskId);
            if (stored !== undefined) {
                this.busy = false;
                return;
            }
            const tryNumber = this.dagRun.tasklist.task_instances
                .filter((task) => task.task_id === taskId)[0].try_number;
            const logs = await this.$stationApi.airflow.getTaskLog(
                this.dagRun.dag_id,
                this.dagRun.dag_run_id,
                taskId,
                tryNumber,
            );
            console.log(logs);
            this.logs.push({ taskId, logs } as TaskLog);
            this.busy = false;
        },
        checkOpen(taskId) {
            return this.open.includes(taskId);
        },
        async toggleOpen(taskId) {
            if (this.checkOpen(taskId)) {
                this.open = this.open.filter((id) => id !== taskId);
            } else {
                await this.getLogs(taskId);
                this.open.push(taskId);
            }
        },
        async handleToggle(taskId) {
            console.log(taskId);
            await this.toggleOpen(taskId);
        },
        getLogEntry(taskId) {
            const stored = this.logs.find((l) => l.taskId === taskId);
            if (stored === undefined) return 'no logs available';
            const logText = JSON.parse(JSON.stringify(stored.logs));
            return logText.run_info;
        },
    },
};
</script>

<template>
    <div>
        <h5><i class="fas fa-tasks" /> Task List</h5>
        <div class="d-flex flex-column">
            <div
                v-for="(item,key) in sortedTasks"
                :key="key"
                class="c-list-item mb-1"
            >
                <task-list-item
                    :entity="item"
                    :logs="getLogEntry(item.task_id)"
                    @toggle="handleToggle"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
