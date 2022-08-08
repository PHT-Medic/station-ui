<script lang="ts">
import { PropType } from 'vue';
import { TaskList } from '../../../domains/airflow';

export default {
    name: 'TaskStatusOverview',
    props: {
        entity: {
            type: Object as PropType<TaskList>,
            required: true,
        },
    },
    computed: {
        status() {
            if (this.entity.task_instances.length === 0) return 'unknown';
            for (let i = 0; i < this.entity.task_instances.length; i++) {
                if (this.entity.task_instances[i].state !== 'success') {
                    return 'failed';
                }
            }
            return 'success';
        },
    },
};
</script>

<template>
    <div class="container">
        <ul>
            <li
                v-for="(task, index) in entity.task_instances"
                :key="index"
                :class="{
                    'task-success': task.state === 'success',
                    'task-failed': task.state === 'failed',
                    'task-running': task.state === 'running',
                    'task-upstream-failed': task.state === 'upstream_failed',
                }"
            >
                {{ index + 1 }}
            </li>
        </ul>
        <hr>
    </div>
</template>

<style scoped>
/*https://stackoverflow.com/a/19649342*/
li {
    width: 2em;
    height: 2em;
    text-align: center;
    line-height: 2em;
    border-radius: 1em;
    background: dodgerblue;
    margin: 0 1em;
    display: inline-block;
    color: white;
    position: relative;
}

li::before{
    content: '';
    position: absolute;
    top: .9em;
    left: -4em;
    width: 4em;
    height: .2em;
    background: dodgerblue;
    z-index: -1;
}

li:first-child::before {
    display: none;
}

.active {
    background: dodgerblue;
}

.active ~ li {
    background: lightblue;
}

.active ~ li::before {
    background: lightblue;
}
.task-success {
    background: green;
}
.task-failed {
    background: red;
}
.task-upstream-failed {
    background: grey;
}
.task-running {
    background: blue;
}

</style>
