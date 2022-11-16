<script lang="ts">
import { PropType } from 'vue';
import TrainName from './TrainName.vue';
import TrainRunAction from './TrainRunAction.vue';
import { Train } from '../../../domains/train';

export default {
    name: 'TrainListItem',
    components: { TrainRunAction, TrainName },
    props: {
        train: {
            type: Object as PropType<Train>,
            required: true,
        },
    },
    data() {
        return {
            busy: false,
            itemBusy: false,
        };
    },
    methods: {
        drop(trainId) {
            console.log('drop', trainId);
            this.$emit('dropTrain', trainId);
        },
    },
};
</script>

<template>
    <div>
        <div class="d-flex flex-row">
            <div class="c-list-icon ml-1">
                <i class="fa fa-train" />
            </div>
            <slot name="item-name">
                <span class="mb-0">
                    <nuxt-link :to="'/trains/'+train.train_id">
                        <train-name
                            :train-id="train.train_id"
                            :train-name="train.name"
                        />
                    </nuxt-link>

                </span>
            </slot>

            <div class="ml-auto">
                <slot
                    name="item-actions"
                    :item="train"
                >
                    <div class="d-flex flex-row">
                        <div class="mr-1">
                            <button
                                type="button"
                                class="btn btn-xs btn-danger"
                                @click.prevent="drop(train.train_id)"
                            >
                                <i class="fas fa-trash" />
                            </button>
                        </div>
                        <div class="mr-1">
                            <nuxt-link :to="'/trains/'+train.train_id">
                                <button
                                    class="btn btn-xs btn-primary"
                                >
                                    <i class="fas fa-eye" />
                                </button>
                            </nuxt-link>
                        </div>
                        <div class="mr-1">
                            <train-run-action :train-id="train.train_id" />
                        </div>
                        <slot
                            name="item-actions-extra"
                            :busy="busy"
                            :item-busy="itemBusy"
                            :item="train"
                        />
                    </div>
                </slot>
            </div>
        </div>
        <div class="mt-2">
            <div class="d-flex flex-row justify-content-between">
                <div class="ml-2">
                    <b class="text-monospace">
                        <i class="fa-solid fa-magnifying-glass" />
                        Status:
                    </b>
                    <span v-if="train.state.status === 'active'">
                        <i class="fas fa-play text-success" />
                        Running
                    </span>
                    <span v-else-if="train.state.status === 'failed'">
                        <i class="fas fa-stop text-danger" />
                        Stopped
                    </span>
                    <span v-else-if="train.state.status === 'inactive'">
                        <i class="fas fa-pause text-warning" />
                        Paused
                    </span>
                </div>
                <div class="ml-4">
                    <b class="text-monospace">
                        <i class="fa fa-globe" />
                        Central:
                    </b>
                    <span
                        v-if="train.state.central_status"
                        :class="{
                            'text-success': train.state.central_status === 'departed',
                            'text-warning': train.state.central_status === 'arrived',
                        }"
                    >
                        {{ train.state.central_status }}
                    </span>
                    <span
                        v-else
                        class="text-dark"
                    >
                        ---
                    </span>
                </div>
                <div class="ml-4">
                    <b class="text-monospace">
                        <i class="fa-solid fa-play" />
                        Last run:
                    </b>
                    <timeago
                        v-if="train.state.last_execution"
                        :datetime="train.state.last_execution"
                    />
                    <span
                        v-else
                        class="text-dark"
                    >
                        ---
                    </span>
                </div>
                <div class="ml-auto">
                    <b class="text-monospace">
                        <i class="fa-solid fa-screwdriver-wrench" />
                    </b>
                    <timeago :datetime="train.created_at" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
