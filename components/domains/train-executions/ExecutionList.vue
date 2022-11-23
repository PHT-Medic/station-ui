<!--
  - Copyright (c) 2022.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import Vue, { PropType } from 'vue';
import { TrainExecution } from '../../../domains/train';

export default Vue.extend({
    props: {
        trainId: {
            type: String,
            default: undefined,
        },
        executions: {
            type: Array as PropType<TrainExecution[]>,
            default: undefined,
        },
    },
    data() {
        return {
            busy: false,
            items: [],
            selected: undefined,
        };
    },
    created() {
        if (this.executions) {
            this.items = this.executions;
        } else {
            Promise.resolve()
                .then(this.load);
        }
    },
    methods: {
        async load() {
            if (this.busy) return;

            this.busy = true;

            try {
                const executions = await this.$stationApi.train.getExecutions(this.trainId);
                this.items = executions.sort((a, b) => (b.start > a.start ? 1 : -1));
            } catch (e) {
                if (e instanceof Error) {
                    this.$emit('failed', e);
                }
            }

            this.busy = false;
        },
        handleClicked(key) {
            this.$emit('selected', this.items[key].airflow_dag_run);
            this.selected = key;
        },
    },
});

</script>
<template>
    <div>
        <h6><i class="fas fa-tasks" /> Executions</h6>
        <div class="c-list">
            <div
                v-for="(item,key) in items"
                :key="key"
                class="mb-2 border rounded p-2 d-flex flex-row"
                :class="{ 'execution-selected': selected === key }"
                @click="handleClicked(key)"
            >
                <div>
                    <span
                        :class="{
                            'text-success': item.end !== null,
                            'text-danger': item.end === null
                        }"
                    >
                        <i class="fa fa-circle" />
                        {{ items.length - key }}
                    </span>
                </div>
                <div
                    class="ml-4"
                >
                    <span>
                        <i class="fas fa-clock" />
                        <timeago
                            class="ml-1"
                            :datetime="item.start"
                        />
                    </span>
                </div>
                <div
                    class="ml-4"
                >
                    <span>
                        <i class="fa fa-flag-checkered" />
                        <timeago
                            v-if="item.end !== null"
                            class="ml-1"
                            :datetime="item.end"
                        />
                        <span
                            v-else
                            class="ml-1"
                        >
                            ---
                        </span>
                    </span>
                </div>
            </div>
        </div>

        <div
            v-if="!busy && items.length === 0"
            class="alert alert-sm alert-warning"
        >
            There have not been any executions yet...
        </div>
    </div>
</template>

<style>
.execution-selected {
    background-color: #f8f9fa;
    box-shadow: 0px 0px 5px 3px rgba(207,236,240,0.86);
    -webkit-box-shadow: 0px 0px 5px 3px rgba(207,236,240,0.86);
    -moz-box-shadow: 0px 0px 5px 3px rgba(207,236,240,0.86);
}

.execution-item {
    background-color: #ECECEC;
}
</style>
