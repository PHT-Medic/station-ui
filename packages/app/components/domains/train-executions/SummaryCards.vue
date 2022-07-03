<script lang="ts">

import { PropType } from 'vue';
import { TrainExecution } from '../../../domains/train';

export default {
    name: 'SummaryCards',
    props: {
        execution: {
            type: Object as PropType<TrainExecution>,
            default: undefined,
        },
        success: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Execution</h5>
                        <p class="card-text">
                            <span class="badge badge-success">Success</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
