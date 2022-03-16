<!--
  - Copyright (c) 2022.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import Vue, { PropType } from 'vue';
import { required } from 'vuelidate/lib/validators';
import { Train } from '../../../domains/train';
import ConfigList from '../config/ConfigList.vue';

export default Vue.extend({
    components: { ConfigList },
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
                proposal_id: '',
                train_id: '',
                config_id: '',
            },
        };
    },
    validations() {
        return {
            form: {
                proposal_id: {
                    required,
                },
                train_id: {
                    required,
                },
                config_id: {
                    required,
                },
            },
        };
    },
    computed: {
        isEditing() {
            return typeof this.entity !== 'undefined';
        },
    },
    created() {
        this.initFromProperties();
    },
    methods: {
        initFromProperties() {
            if (!this.entity) return;

            const keys = Object.keys(this.form);
            for (let i = 0; i < keys.length; i++) {
                if (Object.prototype.hasOwnProperty.call(this.entity, keys[i])) {
                    this.form[keys[i]] = this.entity[keys[i]] || '';
                }
            }
        },
        async submit() {
            if (this.busy) return;

            this.busy = true;

            try {
                let response;

                const { config_id: configId, ...form } = this.form;

                if (this.isEditing) {
                    response = await this.$stationApi.train.update(this.entity.id, {
                        ...form,
                    });

                    response.config_id = configId;

                    this.$emit('updated', response);
                } else {
                    response = await this.$stationApi.train.create({ ...form });

                    response.config_id = configId;

                    this.$emit('created', response);
                }

                await this.$stationApi.trainConfig.create(this.form.train_id, configId);
            } catch (e) {
                // ...
            }

            this.busy = false;
        },
    },
});
</script>
<template>
    <form @submit.prevent="submit">
        <div
            class="form-group"
            :class="{ 'form-group-error': $v.form.proposal_id.$error }"
        >
            <label>Proposal ID</label>
            <input
                v-model="$v.form.proposal_id.$model"
                type="text"
                name="name"
                class="form-control"
                placeholder="Proposal ID..."
            >

            <div
                v-if="!$v.form.proposal_id.required"
                class="form-group-hint group-required"
            >
                Please enter a proposal id.
            </div>
        </div>

        <div
            class="form-group"
            :class="{ 'form-group-error': $v.form.train_id.$error }"
        >
            <label>Train ID</label>
            <input
                v-model="$v.form.train_id.$model"
                type="text"
                name="name"
                class="form-control"
                placeholder="Train ID..."
            >

            <div
                v-if="!$v.form.train_id.required"
                class="form-group-hint group-required"
            >
                Please enter a train id.
            </div>
        </div>

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
            <button
                type="button"
                class="btn btn-primary btn-xs"
                :disabled="$v.$invalid || busy"
                @click.prevent="submit"
            >
                <i class="fas fa-save" /> {{ entity ? 'Update' : 'Create' }}
            </button>
        </div>
    </form>
</template>
