<script lang="ts">
import Vue from 'vue';
import TrainName from '../train/TrainName.vue';

export default Vue.extend({
    components: { TrainName },
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
                this.items = await this.$stationApi.localTrain.getMany();
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
                await this.$stationApi.localTrain.delete(id);

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
                            <i class="fa-solid fa-train" /> Trains
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
            <div
                class="c-list"
            >
                <div
                    v-for="(item,key) in items"
                    :key="key"
                    class="c-list-item mb-2 flex-column"
                >
                    <div
                        class="d-flex flex-row"
                    >
                        <div class="c-list-icon ml-1">
                            <i class="fa fa-train" />
                        </div>
                        <slot name="item-name">
                            <span class="mb-0">
                                <nuxt-link :to="'/local-trains/'+item.id">
                                    <train-name
                                        :train-id="item.id"
                                        :train-name="item.name"
                                    />
                                </nuxt-link>

                            </span>
                        </slot>
                        <div class="ml-auto">
                            <slot
                                name="item-actions"
                                :item="item"
                                :busy="busy"
                            >
                                <div class="d-flex flex-row">
                                    <div>
                                        <button
                                            type="button"
                                            class="btn btn-xs btn-danger"
                                            :disabled="busy"
                                            @click.prevent="drop(item.id)"
                                        >
                                            <i class="fas fa-trash" />
                                        </button>
                                    </div>
                                </div>
                            </slot>
                        </div>
                    </div>
                    <div
                        class="d-flex flex-row mt-2"
                    >
                        <div
                            class="ml-2"
                        >
                            <b class="text-monospace">
                                <i class="fa-solid fa-magnifying-glass" />
                                Status:
                            </b>
                            <span v-if="item.state.status === 'active'">
                                <i class="fas fa-play text-success" />
                                Running
                            </span>
                            <span v-else-if="item.state.status === 'failed'">
                                <i class="fas fa-stop text-danger" />
                                Stopped
                            </span>
                            <span v-else-if="item.state.status === 'inactive'">
                                <i class="fas fa-pause text-warning" />
                                Inactive
                            </span>
                        </div>
                        <div class="ml-4">
                            <b class="text-monospace">
                                <i class="fa-solid fa-play" />
                                Last run:
                            </b>
                            <timeago
                                v-if="item.state.last_execution"
                                :datetime="item.state.last_execution"
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
            No local trains available...
        </div>
    </div>
</template>

<style scoped>

</style>
