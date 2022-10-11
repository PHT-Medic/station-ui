<script lang="ts">
import Vue, { PropType } from 'vue';
import { required } from 'vuelidate/lib/validators';
import { DataType, Dataset } from '../../../../domains/datasets/type';
import ServerSelect from '../fhir/ServerSelect.vue';

export default Vue.extend({
    name: 'DatasetAddForm',
    components: { ServerSelect },
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
                storage_type: 'minio',
                access_path: '',
                fhir_server: null,
            },
            files: [],
            fhirServerAdd: false,
        };
    },
    computed: {
        isEditing() {
            return typeof this.entity !== 'undefined';
        },
        dataTypes() {
            return Object.keys(DataType)
                .map((key, index) => ({
                    value: Object.values(DataType)[index],
                    text: key,
                }));
        },
        uploadDisabled() {
            return this.files.length === 0;
        },
    },
    created() {
        this.initFromProperties();
    },

    methods: {
        formatBytes(bytes: number) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
        },
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
                console.log(data);
                if (this.isEditing) {
                    response = await this.$stationApi.datasets.update(this.entity.id, data);
                    this.upload(response.id);
                    this.$emit('updated', response);
                } else {
                    delete data.id;
                    response = await this.$stationApi.datasets.create(data);
                    console.log(response);
                    this.upload(response.id);
                    this.$emit('created', response);
                }
            } catch (e) {
                // ...
            }

            this.busy = false;
        },
        addFile(file) {
            const droppedFiles = file.dataTransfer.files;
            if (!droppedFiles) return;

            ([...droppedFiles]).forEach((f) => {
                this.files.push(f);
            });
        },
        removeFile(file) {
            this.files = this.files.filter((f) => f !== file);
        },
        upload(id) {
            const formData = new FormData();
            this.files.forEach((f) => {
                formData.append('files', f);
            });
            const response = this.$stationApi.datasets.uploadFiles(id, formData);
            console.log(response);
        },
        handleServerSelected(serverId) {
            console.log('handleServerSelected', serverId);
            this.form.fhir_server = serverId;
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
                <div
                    v-if="form.data_type !== 'fhir'"
                    class="d-flex flex-column h-100"
                >
                    <h5>Files</h5>
                    <div
                        v-cloak
                        id="drop-zone"
                        class="d-flex flex-column h-100"
                        @drop.prevent="addFile"
                        @dragover.prevent
                    >
                        <ul>
                            <li
                                v-for="file in files"
                                :key="file.name"
                                class="mr-auto"
                            >
                                {{ file.name }} ({{ formatBytes(file.size) }})
                                <button
                                    type="button"
                                    title="Remove"
                                    class="btn btn-danger btn-xs mr-auto"
                                    @click="removeFile(file)"
                                >
                                    X
                                </button>
                            </li>
                        </ul>
                        <h5
                            v-if="!files.length"
                            class="align-self-center"
                        >
                            Drag and drop files to upload
                        </h5>
                    </div>
                </div>
                <div
                    v-else
                    class="d-flex flex-column h-100"
                >
                    <h5>Configure FHIR server</h5>
                    <div>
                        <server-select
                            @serverSelected="handleServerSelected"
                        />
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped>
    #drop-zone {
        border: #4facfe dashed 2px;
        background-color: rgba(47,176,255,0.10);
    }
</style>
