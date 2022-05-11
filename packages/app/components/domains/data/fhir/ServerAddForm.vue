<script lang="ts">
import Vue, { PropType } from 'vue';
import { required } from 'vuelidate/lib/validators';
import { FHIRServer } from '../../../../domains/fhir';

export default Vue.extend({
    name: 'ServerAddForm',
    props: {
        entity: {
            type: Object as PropType<FHIRServer>,
            default: undefined,
        },
    },
    data() {
        return {
            busy: false,
            server: {
                name: '',
                api_url: '',
                authMethod: 'None',
                username: '',
                password: '',
                oidc_client_id: '',
                oidc_client_secret: '',
                oidc_url: '',
                token: '',
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
    validations() {
        return {
            server: {
                api_url: {
                    required,
                },
                authMethod: {
                    required,
                },
            },
        };
    },
    methods: {
        initFromProperties() {
            if (!this.entity) return;

            const keys = Object.keys(this.server);
            for (let i = 0; i < keys.length; i++) {
                if (Object.prototype.hasOwnProperty.call(this.entity, keys[i])) {
                    this.server[keys[i]] = this.entity[keys[i]] || '';
                }
            }
        },
        async submit() {
            if (this.busy) return;

            this.busy = true;

            try {
                let response;

                const {
                    config_id: configId,
                    ...form
                } = this.form;

                if (this.isEditing) {
                    response = await this.$stationApi.configuration.update(this.entity.id, {
                        ...form,
                    });

                    this.$emit('updated', response);
                } else {
                    response = await this.$stationApi.configuration.create({ ...form });

                    this.$emit('created', response);
                }
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
        <div class="row">
            <div class="col">
                <div
                    class="form-group"
                    :class="{ 'form-group-error': $v.server.name.$error }"
                >
                    <label>Name</label>
                    <input
                        v-model="$v.server.name.$model"
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
                    Please enter a proposal id.
                </div>
            </div>
            <div class="col">
                hello
            </div>
        </div>
    </form>
</template>

<style scoped>

</style>
