<script lang="ts">
import Vue, { PropType } from 'vue';
import { LocalTrain } from '../../../domains/local-trains';

export default Vue.extend({
    name: 'LocalTrainFiles',
    props: {
        train: {
            type: Object as PropType<LocalTrain>,
            default: undefined,
        },
    },
});
</script>
<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title">
                General
            </h4>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-2 border rounded shadow-sm ml-4">
                    <div class="d-flex justify-content-center mt-2">
                        {{ train.state.status }}
                    </div>
                    <hr>
                    <div class="d-flex justify-content-center font-weight-bold">
                        Status
                    </div>
                </div>
                <div class="col-2 border rounded shadow-sm ml-4">
                    <div class="d-flex justify-content-center mt-2">
                        <timeago :datetime="train.created_at" />
                    </div>
                    <hr>
                    <div class="d-flex justify-content-center font-weight-bold">
                        Created
                    </div>
                </div>
                <div class="col-2 border rounded shadow-sm ml-4">
                    <div class="d-flex justify-content-center mt-2">
                        <timeago
                            v-if="train.updated_at !== null"
                            :datetime="train.created_at"
                        />
                        <span v-else>---</span>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-center font-weight-bold">
                        Updated
                    </div>
                </div>
                <div class="col-2 border rounded shadow-sm ml-4">
                    <div class="d-flex justify-content-center mt-2">
                        <timeago
                            v-if="train.state.last_execution !== null"
                            :datetime="train.state.last_execution"
                        />
                        <span v-else>---</span>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-center font-weight-bold">
                        Last run
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
