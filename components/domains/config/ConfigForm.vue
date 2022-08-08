<!--
  - Copyright (c) 2022.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import Vue, { PropType } from 'vue';
import { required } from 'vuelidate/lib/validators';
import { Configuration } from '../../../domains/config';

export default Vue.extend({
    props: {
        entity: {
            type: Object as PropType<Configuration>,
            default: undefined,
        },
    },
    data() {
        return {
            busy: false,
            form: {
                name: '',
                auto_execute: false,
                environmentVariables: [],
                volumes: [],
            },

            envForm: {
                key: '',
                value: '',
            },

            volumeForm: {
                host_path: '',
                container_path: '',
                mode: '',
            },
        };
    },
    validations() {
        return {
            form: {
                name: {
                    required,
                },
                auto_execute: {
                    required,
                },
            },
            envForm: {
                key: {
                    required,
                },
                value: {
                    required,
                },
            },
            volumeForm: {
                host_path: {
                    required,
                },
                container_path: {
                    required,
                },
                mode: {
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

                const config = {
                    config_id: configId,
                    name: this.form.name,
                    auto_execute: this.form.auto_execute,
                    airflow_config: {
                        env: this.form.environmentVariables,
                        volumes: this.form.volumes,
                    },
                    cpu_requirements: {},
                    gpu_requirements: {},
                };

                if (this.isEditing) {
                    response = await this.$stationApi.configuration.update(this.entity.id, {
                        ...config,
                    });

                    this.$emit('updated', response);
                } else {
                    delete config.config_id;
                    response = await this.$stationApi.configuration.create({ ...config });

                    this.$emit('created', response);
                }
            } catch (e) {
                // ...
            }

            this.busy = false;
        },

        addEnvironment() {
            this.form.environmentVariables.push({
                ...this.envForm,
            });

            this.envForm.key = '';
            this.envForm.value = '';
        },
        dropEnvironment(index) {
            this.form.environmentVariables.splice(index, 1);
        },

        addVolume() {
            this.form.volumes.push({
                ...this.volumeForm,
            });

            this.volumeForm.key = '';
            this.volumeForm.value = '';
        },
        dropVolume(index) {
            this.form.volumes.splice(index, 1);
        },
    },
});
</script>
<template>
    <form @submit.prevent="submit">
        <div class="row">
            <div class="col">
                <div
                    class="form-group"
                    :class="{ 'form-group-error': $v.form.name.$error }"
                >
                    <label>Name</label>
                    <input
                        v-model="$v.form.name.$model"
                        type="text"
                        name="name"
                        class="form-control"
                        placeholder="Name..."
                    >

                    <div
                        v-if="!$v.form.name.required"
                        class="form-group-hint group-required"
                    >
                        Please enter a proposal id.
                    </div>
                </div>

                <hr>

                <div class="form-group">
                    <label>Auto execution</label>
                    <div>
                        <b-form-checkbox
                            v-model="$v.form.auto_execute.$model"
                        >
                            Auto start the train when received?
                        </b-form-checkbox>
                    </div>
                </div>

                <hr>
            </div>
            <div class="col">
                <h6><i class="fa fa-bars" /> Environments</h6>
                <div
                    v-for="(item,key) in form.environmentVariables"
                    :key="key"
                    class="d-flex flex-column mb-2"
                >
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <input
                                    :value="item.key"
                                    :disabled="true"
                                    type="text"
                                    class="form-control"
                                >
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <input
                                    :value="item.value"
                                    :disabled="true"
                                    type="text"
                                    class="form-control"
                                >
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label>Key</label>
                            <input
                                v-model="envForm.key"
                                type="text"
                                name="name"
                                class="form-control"
                                placeholder="..."
                            >
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label>Value</label>
                            <input
                                v-model="envForm.value"
                                type="text"
                                name="name"
                                class="form-control"
                                placeholder="..."
                            >
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    class="btn btn-primary btn-xs"
                    :disabled="$v.envForm.$invalid"
                    @click.prevent="addEnvironment"
                >
                    <i class="fas fa-plus" /> Add
                </button>

                <hr>

                <h6><i class="fa-solid fa-hard-drive" /> Volumes</h6>
                <div
                    v-for="(item,key) in form.volumes"
                    :key="key"
                    class="d-flex flex-column mb-2"
                >
                    <div class="row">
                        <div class="col-5">
                            <div class="form-group">
                                <input
                                    :value="item.host_path"
                                    :disabled="true"
                                    type="text"
                                    class="form-control"
                                >
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="form-group">
                                <input
                                    :value="item.container_path"
                                    :disabled="true"
                                    type="text"
                                    class="form-control"
                                >
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="form-group">
                                <input
                                    :value="item.mode"
                                    :disabled="true"
                                    type="text"
                                    class="form-control"
                                >
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-5">
                        <div class="form-group">
                            <label>Host Path</label>
                            <input
                                v-model="volumeForm.host_path"
                                type="text"
                                name="name"
                                class="form-control"
                                placeholder="..."
                            >
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="form-group">
                            <label>Container Path</label>
                            <input
                                v-model="volumeForm.container_path"
                                type="text"
                                name="name"
                                class="form-control"
                                placeholder="..."
                            >
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-group">
                            <label>Mode</label>
                            <select
                                v-model="volumeForm.mode"
                                class="form-control"
                            >
                                <option value="">
                                    -- Please select --
                                </option>
                                <option value="rw">
                                    rw
                                </option>
                                <option value="ro">
                                    ro
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    class="btn btn-primary btn-xs"
                    :disabled="$v.volumeForm.$invalid"
                    @click.prevent="addVolume"
                >
                    <i class="fas fa-plus" /> Add
                </button>
            </div>
        </div>

        <div class="form-group">
            <button
                type="button"
                class="btn btn-primary btn-xs"
                :disabled="$v.form.$invalid || busy"
                @click.prevent="submit"
            >
                <i class="fas fa-save" /> {{ entity ? 'Update' : 'Create' }}
            </button>
        </div>
    </form>
</template>
