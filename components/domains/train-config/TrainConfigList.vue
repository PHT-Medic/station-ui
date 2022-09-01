<!--
  - Copyright (c) 2022.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import { Configuration } from '../../../domains/config';
import ConfigList from '../config/ConfigList.vue';

export default {
    components: { ConfigList },
    props: {
        trainId: String,
    },
    data() {
        return {
            busy: false,
            configId: '',

            loaded: false,
        };
    },
    created() {
        Promise.resolve()
            .then(() => this.init())
            .then(() => {
                this.loaded = true;
            });
    },
    methods: {
        init() {
            this.busy = false;
        },
        async add(configId: Configuration['id']) {
            if (this.busy) return;

            this.busy = true;

            try {
                await this.$stationApi.trainConfig.create(this.trainId, configId);

                this.configId = configId;

                this.$emit('created', this.configId);
            } catch (e) {
                if (e instanceof Error) {
                    this.$emit('failed', e);
                }
            }

            this.busy = false;
        },
        handleSelected(e) {
            console.log(e.target.value);
            this.$emit('selected', e.target.value);
        },
    },
};
</script>
<template>
    <div>
        <div class="form-group">
            <config-list :with-header="false">
                <template #items="{ items }">
                    <select
                        v-model="configId"
                        class="form-control"
                        @change.prevent="handleSelected"
                    >
                        <option value="">
                            -- Please select --
                        </option>
                        <option
                            v-for="(item,key) in items"
                            :key="key"
                            :value="item.id"
                        >
                            {{ item.name }}
                        </option>
                    </select>
                </template>
            </config-list>
        </div>
    </div>
</template>
