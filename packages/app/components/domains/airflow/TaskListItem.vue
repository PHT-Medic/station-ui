<script lang="ts">
import { PropType } from 'vue';
import { Task } from '../../../domains/airflow';

export default {
    name: 'TaskListItem',
    props: {
        entity: {
            type: Object as PropType<Task>,
            required: true,
        },
    },
    data() {
        return {
            busy: false,
            logs: '',
        };
    },
    computed: {
        logsUrl() {
            return `/api/airflow/dags/${this.dagId}/tasks/${this.entity.task_id}/logs`;
        },
        capName() {
            const nameArr = [];
            const split = this.entity.task_id.split('_');
            for (let i = 0; i < split.length; i++) {
                nameArr.push(split[i].charAt(0).toUpperCase() + split[i].slice(1));
            }
            return nameArr.join(' ');
        },
    },
    methods: {

    },
};
</script>

<template>
    <div class="task-item">
        <div class="d-flex flex-row justify-content-between">
            <div class="c-list-icon">
                <i class="fa fa-check" />
            </div>
            <slot name="item-name">
                <span class="mb-0">
                    <span class="text-muted">{{ capName }}</span>
                </span>
            </slot>
            <div class="ml-auto">
                <slot
                    name="item-actions"
                    :item="entity"
                >
                    <div class="d-flex flex-row">
                        <div>
                            <button
                                type="button"
                                class="btn btn-xs btn-info"
                            >
                                <i class="fas fa-arrow-down" />
                            </button>
                        </div>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<style scoped>

.task-item {
    background-color: #ececec;
    border: 1px solid #dedede;

    /* box-shadow: 0 4px 25px 0 rgba(0,0,0,.1); */
    transition: all .3s ease-in-out;

    border-radius: 4px;

    padding: 0.25rem 0.25rem;
    margin-bottom: 0.5rem;
}
</style>
