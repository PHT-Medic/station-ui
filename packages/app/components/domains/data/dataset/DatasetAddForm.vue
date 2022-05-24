<script lang="ts">
import Vue, { PropType } from 'vue';
import { alphaNum, required, url } from 'vuelidate/lib/validators';
import { DataType, Dataset, StorageType } from '../../../../domains/datasets/type';
import { AuthMethods } from '../../../../domains/fhir';

export default Vue.extend({
    name: 'DatasetAddForm',
    props: {
        entity: {
            type: Object as PropType<Dataset>,
            default: undefined,
        },
    },
    data() {
        return {
            busy: false,
            form: {
                name: '',
                data_type: '',
                proposal_id: '',
                storage_type: StorageType.MINIO,
            },
        };
    },
    computed: {
        isEditing() {
            return typeof this.entity !== 'undefined';
        },
        dataTypes() {
            return Object.keys(DataType).map((key) => ({
                value: key,
                text: DataType[key],
            }));
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

                const data = { ...this.form };
                if (this.isEditing) {
                    response = await this.$stationApi.datasets.update(this.entity.id, data);
                    this.$emit('updated', response);
                } else {
                    delete data.id;
                    response = await this.$stationApi.datasets.create(data);
                    this.$emit('created', response);
                }
            } catch (e) {
                // ...
            }

            this.busy = false;
        },
    },
    validations() {
        return {
            form: {
                name: {
                    required,
                },
                data_type: {
                    required,
                },
            },
        };
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
                </div>
                <div
                    v-if="!$v.form.name.required"
                    class="form-group-hint group-required"
                >
                    Please enter a dataset name.
                </div>
                <hr>
                <div class="form-group">
                    <label>Choose a data type</label>
                    <b-form-select
                        v-model="$v.form.data_type.$model"
                        :options="dataTypes"
                        size="sm"
                    />
                </div>
                <div
                    v-if="!$v.form.data_type.required"
                    class="form-group-hint group-required"
                >
                    Please select a datatype.
                </div>
                <hr>
                <div
                    class="form-group"
                >
                    <label>Proposal ID</label>
                    <input
                        v-model="form.proposal_id"
                        type="text"
                        name="proposal-id"
                        class="form-control"
                        placeholder="Optional proposal ID"
                    >
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
            </div>
            <div class="col">
                <div>
                    Dataset content
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped>

</style>
