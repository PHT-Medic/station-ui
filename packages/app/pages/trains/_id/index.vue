<!--
  Copyright (c) 2021-2021.
  Author Peter Placzek (tada5hi)
  For the full copyright and license information,
  view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">

import { PropType } from 'vue';
import { required } from 'vuelidate/lib/validators';
import { Train } from '../../../domains/train';
import TrainExecutions from '../../../components/domains/train/TrainExecutions.vue';
import ConfigList from '../../../components/domains/config/ConfigList.vue';
import DatasetList from '../../../components/domains/data/dataset/DatasetList.vue';
import TrainInfo from "../../../components/domains/train/TrainInfo.vue";

export default {
    components: {
        TrainInfo,
        TrainExecutions, ConfigList, DatasetList,
    },
    props: {
        entity: {
            type: Object as PropType<Train>,
            default: undefined,
        },
    },
    data() {
        return {
            busy: false,
            form: {
                config_id: '',
                dataset_id: '',
            },
        };
    },
    validations() {
        return {
            form: {
                config_id: {
                    required,
                },
            },
        };
    },
    methods: {
        handleUpdated(train) {
            this.$emit('updated', train);
        },
        handleFailed(e) {
            this.$emit('failed', e);
        },
        async run() {
            console.log('run', this.configId);
            if (this.busy) return;

            this.busy = true;

            try {
                const train = await this.$stationApi.train.run(this.train.train_id, { config_id: this.configId });
                console.log('train', train);
                this.$emit('done', train);
            } catch (e) {
                console.log('error', e);
                this.$emit('failed', e);
            }

            this.busy = false;
        },
    },
};
</script>

<template>
    <div>
        <div class="row">
            <div class="col">
                <TrainInfo
                    :entity="entity"
                />
            </div>
            <div class="col">
                <div>
                    <div>
                        <h6><i class="fas fa-play" /> Run</h6>
                        <div class="form-group">
                            <label>Configuration</label>
                            <config-list :with-header="false">
                                <template #items="{items}">
                                    <select
                                        v-model="$v.form.config_id.$model"
                                        class="form-control"
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
                            <div
                                v-if="!$v.form.config_id.required"
                                class="form-group-hint group-required"
                            >
                                Please select a config id.
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Dataset</label>
                            <dataset-list :with-header="false">
                                <template #items="{items}">
                                    <select
                                        v-model="form.dataset_id"
                                        class="form-control"
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
                            </dataset-list>
                        </div>
                        <div class="form-group">
                            <button
                                type="button"
                                class="btn btn-primary btn-xs"
                                :disabled="$v.form.$invalid || busy"
                                @click.prevent="run"
                            >
                                <i class="fas fa-play" /> Start
                            </button>
                        </div>
                    </div>
                    <hr>
                    <train-executions :train-id="entity.train_id" />
                </div>
            </div>
        </div>
    </div>
</template>
