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
                this.items = await this.$stationApi.datasets.getMany();
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
                await this.$stationApi.datasets.delete(id);

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
                            <i class="fa-solid fa-box" /> Datasets
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
            <div class="d-flex flex-row flex-grow-1">
                <div
                    v-if="busy"
                    class="d-flex flex-row flex-grow-1 align-items-center justify-content-center"
                >
                    <div
                        class="spinner-border"
                        role="status"
                    >
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <div
                    v-else
                    class="d-flex flex-column flex-grow-1 c-list"
                >
                    <div
                        v-for="item in items"
                        :key="item.id"
                        class="d-flex flex-column mb-2 c-list-item"
                    >
                        <div
                            class="d-flex flex-row flex-grow-1 justify-content-between"
                        >
                            <slot name="item-name">
                                <span class="font-weight-bold">
                                    <nuxt-link :to="'/data/datasets/'+item.id">
                                        {{ item.name }}
                                    </nuxt-link>
                                </span>
                            </slot>
                        </div>

                        <div
                            class="d-flex flex-row flex-grow-1 justify-content-between"
                        >
                            <slot name="item-info">
                                <span class="text-muted">
                                    <i class="fas fa-clock" />
                                    <timeago :datetime="item.created_at" />
                                </span>
                            </slot>
                            <slot name="item-actions">
                                <div
                                    class="d-flex flex-row justify-content-end"
                                >
                                    <button
                                        type="button"
                                        class="btn btn-xs btn-danger mr-2"
                                        :disabled="itemBusy"
                                        @click.prevent="drop(item.id)"
                                    >
                                        <i class="fas fa-trash" />
                                    </button>
                                    <nuxt-link :to="'/data/datasets/'+item.id">
                                        <button
                                            type="button"
                                            class="btn btn-xs btn-info"
                                        >
                                            <i class="fas fa-eye" />
                                        </button>
                                    </nuxt-link>
                                </div>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </slot>

        <div
            v-if="!busy && items.length === 0"
            class="alert alert-sm alert-warning mt-2"
        >
            No datasets available...
        </div>
    </div>
</template>
