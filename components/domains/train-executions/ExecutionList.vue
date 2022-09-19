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
                class="c-list-item mb-2"
                :class="{ 'selected': selected === key }"
                @click="handleClicked(key)"
            >
                <div>
                    <i class="fa fa-train" />
                    <span
                        :class="{
                            'text-success': item.end !== null,
                            'text-danger': item.end === null
                        }"
                    >
                        {{ item.train_id }}
                    </span>
                </div>
                <div class="ml-auto">
                    <div class="d-flex flex-column">
                        <div>
                            <timeago :datetime="item.start" />
                        </div>
                        <div v-if="item.end !== null">
                            <timeago :datetime="item.end" />
                        </div>
                        <div v-else>
                            ---
                        </div>
                    </div>
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
.selected {
    box-shadow: 0px 0px 5px 3px rgba(207,236,240,0.86);
    -webkit-box-shadow: 0px 0px 5px 3px rgba(207,236,240,0.86);
    -moz-box-shadow: 0px 0px 5px 3px rgba(207,236,240,0.86);
}
</style>
