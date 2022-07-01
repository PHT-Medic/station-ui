<!--
  - Copyright (c) 2022.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        trainId: {
            type: String,
            default: undefined,
        },
    },
    data() {
        return {
            busy: false,
            items: [],
        };
    },
    created() {
        Promise.resolve()
            .then(this.load);
    },
    methods: {
        async load() {
            if (this.busy) return;

            this.busy = true;

            try {
                this.items = await this.$stationApi.train.getExecutions(this.trainId);
            } catch (e) {
                if (e instanceof Error) {
                    this.$emit('failed', e);
                }
            }

            this.busy = false;
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
            >
                <div>
                    <i class="fa fa-train" /> <span class="text-success">{{ item.airflow_dag_run }}</span>
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
            class="alet alert-sm alert-warning"
        >
            There have not been any executions yet...
        </div>
    </div>
</template>
