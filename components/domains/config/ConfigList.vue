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
                this.items = await this.$stationApi.configuration.getMany();
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
                await this.$stationApi.configuration.delete(id);

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
                            <i class="fa-solid fa-tools" /> Configurations
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
                            <i class="fa fa-bars" />
                        </div>
                        <slot name="item-name">
                            <span class="mb-0">
                                <nuxt-link :to="'/configurations/'+item.id">
                                    {{ item.name }}
                                </nuxt-link>
                            </span>
                        </slot>
                        <div class="ml-auto">
                            <slot
                                name="item-actions"
                                :item="item"
                            >
                                <div class="d-flex flex-row">
                                    <div>
                                        <button
                                            type="button"
                                            class="btn btn-xs btn-danger"
                                            @click.prevent="drop(item.id)"
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
                    <div class="d-flex flex-row justify-content-between">
                        <div class="d-flex flex-row">
                            <div class="ml-1">
                                <b class="text-monospace">
                                    <i class="fa-solid fa-circle-info" />
                                    Env vars:
                                </b>
                                <span
                                    v-if="item.airflow_config.env !== null && item.airflow_config.env.length > 0"
                                    class="text-monospace text-success"
                                >
                                    {{ item.airflow_config.env.length }}
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
                                    <i class="fa-solid fa-hard-drive" />
                                    Volumes:
                                </b>
                                <span
                                    v-if="item.airflow_config.volumes !== null && item.airflow_config.volumes.length > 0"
                                    class="text-monospace text-success"
                                >
                                    {{ item.airflow_config.env.length }}
                                </span>
                                <span
                                    v-else
                                    class="text-dark"
                                >
                                    ---
                                </span>
                            </div>
                        </div>
                        <div>
                            <div class="ml-auto">
                                <b class="text-monospace">
                                    <i class="fa-solid fa-screwdriver-wrench" />
                                </b>
                                <timeago :datetime="item.created_at" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </slot>

        <div
            v-if="!busy && items.length === 0"
            class="alert alert-sm alert-warning mt-2"
        >
            No configurations available...
        </div>
    </div>
</template>
