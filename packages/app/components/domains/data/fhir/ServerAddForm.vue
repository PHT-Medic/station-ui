<script lang="ts">
import Vue, { PropType } from 'vue';
import { alphaNum, required, url } from 'vuelidate/lib/validators';
import { AuthMethods, FHIRServer } from '../../../../domains/fhir';

function validateBasicAuth(value, siblings) {
    if (siblings.authMethod !== AuthMethods.Basic) {
        return true;
    }

    return value.length > 3;
}

function validateBearerAuth(value, siblings) {
    if (siblings.authMethod !== AuthMethods.Bearer) {
        return true;
    }

    return value.length > 3;
}

function validateOIDCAuth(value, siblings) {
    if (siblings.authMethod !== AuthMethods.OIDC) {
        return true;
    }

    return value.length > 3;
}

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
                id: '',
                name: '',
                api_address: '',
                authMethod: 'None',
                username: '',
                password: '',
                oidc_client_id: '',
                oidc_client_secret: '',
                oidc_url: '',
                token: '',
                proposal_id: '',
            },
        };
    },
    computed: {
        isEditing() {
            return typeof this.entity !== 'undefined';
        },
        authMethods() {
            return Object.keys(AuthMethods).map((key) => ({
                value: key,
                text: AuthMethods[key],
            }));
        },
    },
    created() {
        this.initFromProperties();
    },
    validations() {
        return {
            server: {
                name: {
                    required,
                },
                api_address: {
                    required,
                    url,
                },
                authMethod: {
                    required,
                },
                username: {
                    validateBasicAuth,
                },
                password: {
                    validateBasicAuth,
                },
                token: {
                    validateBearerAuth,
                },
                oidc_client_id: {
                    validateOIDCAuth,
                },
                oidc_client_secret: {
                    validateOIDCAuth,
                },
                oidc_url: {
                    validateOIDCAuth,
                },
                proposal_id: {
                    alphaNum,
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

                const data = { ...this.server };
                delete data.authMethod;

                console.log('data', data);
                if (this.isEditing) {
                    response = await this.$stationApi.fhir.update(this.entity.id, data);
                    this.$emit('updated', response);
                } else {
                    delete data.id;
                    response = await this.$stationApi.fhir.create(data);
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
                    v-if="!$v.server.name.required"
                    class="form-group-hint group-required"
                >
                    Please enter a server name.
                </div>
                <hr>
                <div
                    class="form-group"
                    :class="{ 'form-group-error': $v.server.api_address.$error }"
                >
                    <label>API URL</label>
                    <input
                        v-model="$v.server.api_address.$model"
                        type="text"
                        name="name"
                        class="form-control"
                        placeholder="REST API url"
                    >
                </div>
                <div
                    v-if="!$v.server.api_address.required"
                    class="form-group-hint group-required"
                >
                    Enter the base endpoint of your servers REST API.
                </div>
                <hr>
                <div
                    class="form-group"
                >
                    <label>Proposal ID</label>
                    <input
                        v-model="$v.server.proposal_id.$model"
                        type="text"
                        name="proposal-id"
                        class="form-control"
                        placeholder="Optional proposal ID"
                    >
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label>Select authentication method</label>
                    <b-form-select
                        v-model="server.authMethod"
                        :options="authMethods"
                        size="sm"
                    />
                </div>
                <div
                    v-if="server.authMethod === 'Basic'"
                >
                    <div
                        class="form-group"
                        :class="{ 'form-group-error': $v.server.username.$error }"
                    >
                        <label>Username</label>
                        <input
                            v-model="$v.server.username.$model"
                            type="text"
                            name="username"
                            class="form-control"
                            placeholder="Username..."
                        >
                    </div>
                    <div
                        class="form-group"
                        :class="{ 'form-group-error': $v.server.password.$error }"
                    >
                        <label>Password</label>
                        <input
                            v-model="$v.server.password.$model"
                            type="password"
                            name="password"
                            class="form-control"
                            placeholder="Password..."
                        >
                    </div>
                </div>
                <div
                    v-if="server.authMethod === 'Bearer'"
                >
                    <div
                        class="form-group"
                        :class="{ 'form-group-error': $v.server.token.$error }"
                    >
                        <label>Bearer Token</label>
                        <input
                            v-model="$v.server.token.$model"
                            type="password"
                            name="token"
                            class="form-control"
                            placeholder="Bearer Token..."
                        >
                    </div>
                </div>
                <div
                    v-if="server.authMethod === 'OIDC'"
                >
                    <div
                        class="form-group"
                        :class="{ 'form-group-error': $v.server.oidc_url.$error }"
                    >
                        <label>Provider URL</label>
                        <input
                            v-model="$v.server.oidc_url.$model"
                            type="text"
                            name="oidc-url"
                            class="form-control"
                            placeholder="OIDC Provider URL..."
                        >
                    </div>
                    <div
                        class="form-group"
                        :class="{ 'form-group-error': $v.server.oidc_client_id.$error }"
                    >
                        <label>Client ID</label>
                        <input
                            v-model="$v.server.oidc_client_id.$model"
                            type="text"
                            name="client-id"
                            class="form-control"
                            placeholder="Client ID..."
                        >
                    </div>
                    <div
                        class="form-group"
                        :class="{ 'form-group-error': $v.server.oidc_client_secret.$error }"
                    >
                        <label>Client Secret</label>
                        <input
                            v-model="$v.server.password.$model"
                            type="password"
                            name="client-secret"
                            class="form-control"
                            placeholder="Client Secret..."
                        >
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group">
            <button
                type="button"
                class="btn btn-primary btn-xs"
                :disabled="$v.server.$invalid || busy"
                @click.prevent="submit"
            >
                <i class="fas fa-save" /> {{ entity ? 'Update' : 'Create' }}
            </button>
        </div>
    </form>
</template>

<style scoped>

</style>
