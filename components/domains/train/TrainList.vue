<!--
  - Copyright (c) 2022.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import Vue from 'vue';
import TrainListItem from './TrainListItem.vue';

export default Vue.extend({
    components: { TrainListItem },
    props: {
        withHeader: {
            type: Boolean,
            default: true,
        },
        maxItems: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            busy: false,
            items: [],

            itemBusy: false,
        };
    },

    computed: {
        itemsToDisplay() {
            if (this.maxItems === null) {
                return this.items;
            }

            return this.items.slice(0, this.maxItems);
        },
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
                this.items = await this.$stationApi.train.getMany();
            } catch (e) {
                if (e instanceof Error) {
                    this.$emit('failed', e);
                }
            }

            this.busy = false;
        },
        async refresh() {
            if (this.itemBusy) return;

            this.itemBusy = true;

            try {
                await this.$stationApi.train.sync();
                this.items = await this.$stationApi.train.getMany();
            } catch (e) {
                if (e instanceof Error) {
                    this.$emit('failed', e);
                }
            }

            this.itemBusy = false;
        },

        async drop(id) {
            if (this.itemBusy) return;

            this.itemBusy = true;

            try {
                await this.$stationApi.train.delete(id);

                this.handleDeleted({ id });
            } catch (e) {
                console.log(e);
                if (e instanceof Error) {
                    this.$emit('failed', e);
                }
            }

            this.itemBusy = false;
        },

        async handleDrop(id) {
            console.log('handleDrop', id);
            await this.drop(id);
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
                <div class="d-flex flex-row flex-fill justify-content-center">
                    <div class="mb-auto">
                        <button
                            type="button"
                            class="btn btn-xs btn-link"
                        >
                            Active
                        </button>
                    </div>
                    <div class="mb-auto">
                        <button
                            type="button"
                            class="btn btn-xs btn-link"
                        >
                            Available
                        </button>
                    </div>
                    <div class="mb-auto">
                        <button
                            type="button"
                            class="btn btn-xs btn-link"
                        >
                            Finished
                        </button>
                    </div>
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
                                    @click.prevent="refresh"
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
                    v-for="(item,key) in itemsToDisplay"
                    :key="key"
                    class="c-list-item mb-2 flex-column"
                >
                    <TrainListItem
                        :train="item"
                        @dropTrain="handleDrop"
                    />
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
