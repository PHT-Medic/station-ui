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
        logs: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            busy: false,
            open: false,
        };
    },
    computed: {
        capName() {
            const nameArr = [];
            const split = this.entity.task_id.split('_');
            for (let i = 0; i < split.length; i++) {
                nameArr.push(split[i].charAt(0).toUpperCase() + split[i].slice(1));
            }
            return nameArr.join(' ');
        },
        logLines() {
            if (this.logs === null) return [];
            return this.logs.split('\n');
        },
    },
    methods: {
        handleClick() {
            if (this.busy) return;
            this.busy = true;
            this.$emit('toggle', this.entity.task_id);
            this.open = !this.open;
            this.busy = false;
        },
    },
};
</script>

<template>
    <div>
        <div class="task-item">
            <div class="d-flex flex-row justify-content-between">
                <div class="c-list-icon mx-1">
                    <i
                        v-if="entity.state === 'success'"
                        class="fa fa-check text-success"
                    />
                    <i
                        v-else-if="entity.state === 'failed'"
                        class="fa fa-times text-danger"
                    />
                    <i
                        v-else
                        class="fa fa-clock text-warning"
                    />
                </div>
                <slot name="item-name">
                    <p class="mb-0">
                        <span class="text-muted">{{ capName }}</span>
                    </p>
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
                                    class="btn btn-xs"
                                    style="background-color: transparent"
                                    @click.prevent="handleClick"
                                >
                                    <i
                                        v-if="!open"
                                        class="fas fa-angle-down"
                                    />
                                    <i
                                        v-else
                                        class="fas fa-angle-up"
                                    />
                                </button>
                            </div>
                        </div>
                    </slot>
                </div>
            </div>
        </div>
        <div
            v-if="open"
            class="task-item-body"
        >
            <p
                v-for="(line, index) in logLines"
                :key="index"
                class="task-item-text"
            >
                {{ line }}
            </p>
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

.task-item-body {
    padding: 0.5rem 0.5rem;
    border: 1px solid #dedede;
    overflow-x: auto;
    white-space: nowrap;
    margin: 0.2rem 0.2rem;
}
.task-item-text {
    margin-bottom: 0.1rem;
    text-align: left;
}
</style>
