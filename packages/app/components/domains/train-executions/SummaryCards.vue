<script lang="ts">

import { Context } from '@nuxt/types';
import { PropType } from 'vue';
import { AirflowDagRun } from '../../../domains/airflow';
import { TrainExecution } from '../../../domains/train';

export default {
    name: 'SummaryCards',
    props: {
        execution: {
            type: Object as PropType<TrainExecution>,
            default: undefined,
        },
        status: {
            type: String,
            default: 'failed',
        },
        dagRun: {
            type: Object as PropType<AirflowDagRun>,
            default: null,
        },
    },
    data() {
        return {
            busy: true,
            dataset: null,
            config: null,
        };
    },
    async fetch() {
        this.dataset = await this.$stationApi.datasets.get(this.execution.dataset);
        this.config = await this.$stationApi.trainConfig.get(this.execution.config);
        this.busy = false;
    },
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card align-content-center">
                    <div class="card-body text-center">
                        <p class="card-text">
                            <span
                                v-if="status === 'success'"
                                class="badge badge-success"
                            >
                                Success
                            </span>
                            <span
                                v-else
                                class="badge badge-danger"
                            >
                                Failed
                            </span>
                        </p>
                    </div>
                    <h6 class="card-title text-center">
                        Status
                    </h6>
                </div>
            </div>
            <div class="col">
                <div class="card align-content-center">
                    <div class="card-body text-center">
                        <div class="row">
                            <div class="col-3">
                                <i class="fa fa-play" />
                            </div>
                            <div class="col-9">
                                <span><timeago :datetime="execution.start" /></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <i class="fa fa-flag-checkered" />
                            </div>
                            <div class="col-9">
                                <span>
                                    <timeago
                                        v-if="execution.end !== null"
                                        :datetime="execution.end"
                                    />
                                    <span v-else>
                                        ---
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <h6 class="card-title text-center">
                        <i class="fa fa-clock-four" />
                    </h6>
                </div>
            </div>
            <div class="col">
                <div class="card align-content-center">
                    <div class="card-body text-center">
                        <nuxt-link
                            v-if="!busy"
                            :to="'/configurations/'+ config.id"
                        >
                            <p>
                                <i class="fa fa-arrow-up-right-from-square" />
                                {{ config.name }}
                            </p>
                        </nuxt-link>
                    </div>
                    <h6 class="card-title text-center">
                        Config
                    </h6>
                </div>
            </div>
            <div class="col">
                <div class="card align-content-center">
                    <div class="card-body text-center">
                        <nuxt-link
                            v-if="!busy && dataset !== null"
                            :to="'/datasets/'+ dataset.id"
                        >
                            <p>
                                <i class="fa fa-arrow-up-right-from-square" />
                                {{ dataset.name }}
                            </p>
                        </nuxt-link>
                    </div>
                    <h6 class="card-title text-center">
                        Dataset
                    </h6>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
