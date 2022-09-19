<script>
import TrainName from './TrainName.vue';
import TrainRunAction from './TrainRunAction.vue';

export default {
    name: 'TrainListItem',
    components: { TrainRunAction, TrainName },
    props: {
        train: {
            type: Object,
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
            <div class="c-list-icon">
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
                            <train-run-action :train-id="train.train_id" />
                        </div>
                        <div>
                            <button
                                type="button"
                                class="btn btn-xs btn-danger"
                                @click.prevent="drop(train.train_id)"
                            >
                                <i class="fas fa-trash" />
                            </button>
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
        <div>
            <div class="d-flex flex-row">
                <div class="container">
                    <div class="row">
                        <div class="mr-1">
                            {{ train.is_active }}
                        </div>
                        <div class="mr-1">
                            {{ train.proposal_id }}
                        </div>
                    </div>
                </div>
                <div class="ml-auto">
                    <timeago :datetime="train.created_at" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
