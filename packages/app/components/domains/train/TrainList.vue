<!--
  - Copyright (c) 2022.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import Vue from 'vue';
import TrainName from './TrainName.vue';
import TrainRunAction from './TrainRunAction.vue';

export default Vue.extend({
    components: { TrainRunAction, TrainName },
    props: {
        withHeader: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            busy: false,
            items: [],

            itemBusy: false,
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
                const response = await this.$stationApi.train.getMany();

                this.items = response;
            } catch (e) {
                if (e instanceof Error) {
                    this.$emit('failed', e);
                }
            }

            this.busy = false;
        },

        async drop(id) {
            if (this.itemBusy) return;

            this.itemBusy = true;

            try {
                await this.$stationApi.train.delete(id);

                this.handleDeleted({ id });
            } catch (e) {
                if (e instanceof Error) {
                    this.$emit('failed', e);
                }
            }

            this.itemBusy = false;
        },

        handleDeleted(item) {
            const index = this.items.findIndex((el) => el.id === item.id);
            if (index !== -1) {
                this.items.splice(index, 1);
            }
        },
    },
});
</script>
<template>
    <div>
        <slot
            v-if="withHeader"
            name="header"
        >
            <div class="d-flex flex-row mb-2">
                <div>
                    <slot name="header-title">
                        <h6 class="mb-0">
                            <i class="fa fa-train" /> Trains
                        </h6>
                    </slot>
                </div>
                <div class="ml-auto">
                    <slot
                        name="header-actions"
                        :load="load"
                        :busy="busy"
                    >
                        <div class="d-flex flex-row">
                            <div>
                                <button
                                    type="button"
                                    class="btn btn-xs btn-dark"
                                    :disabled="busy"
                                    @click.prevent="load"
                                >
                                    <i class="fas fa-sync" /> Refresh
                                </button>
                            </div>
                        </div>
                    </slot>
                </div>
            </div>
        </slot>
        <slot
            name="items"
            :items="items"
            :busy="busy"
        >
            <div class="c-list">
                <div
                    v-for="(item,key) in items"
                    :key="key"
                    class="c-list-item mb-2 flex-column"
                >
                    <div class="d-flex flex-row">
                        <div class="c-list-icon">
                            <i class="fa fa-train" />
                        </div>
                        <slot name="item-name">
                            <span class="mb-0">
                                <nuxt-link :to="'/trains/'+item.train_id">
                                    <train-name
                                        :train-id="item.train_id"
                                        :train-name="item.name"
                                    />
                                </nuxt-link>

                            </span>
                        </slot>

                        <div class="ml-auto">
                            <slot
                                name="item-actions"
                                :item="item"
                            >
                                <div class="d-flex flex-row">
                                    <div class="mr-1">
                                        <train-run-action :train-id="item.train_id" />
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            class="btn btn-xs btn-danger"
                                            @click.prevent="drop(item.train_id)"
                                        >
                                            <i class="fas fa-trash" />
                                        </button>
                                    </div>
                                    <slot
                                        name="item-actions-extra"
                                        :busy="busy"
                                        :item-busy="itemBusy"
                                        :item="item"
                                    />
                                </div>
                            </slot>
                        </div>
                    </div>
                    <div class="d-flex flex-row">
                        <div />
                        <div class="ml-auto">
                            <timeago :datetime="item.created_at" />
                        </div>
                    </div>
                </div>
            </div>
        </slot>

        <div
            v-if="!busy && items.length === 0"
            class="alert alert-sm alert-warning mt-2"
        >
            No trains available...
        </div>
    </div>
</template>
