<!--
  Copyright (c) 2021-2021.
  Author Peter Placzek (tada5hi)
  For the full copyright and license information,
  view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import { maxLength, minLength, required } from 'vuelidate/lib/validators';
import { LayoutKey, LayoutNavigationID } from '../config/layout/contants';
import CTScan from '../components/svg/CTScan.vue';

export default {
    components: { CTScan },
    meta: {
        [LayoutKey.REQUIRED_LOGGED_OUT]: true,
        [LayoutKey.NAVIGATION_ID]: LayoutNavigationID.DEFAULT,
    },
    data() {
        return {
            provider: {
                items: [],
                busy: false,
                meta: {
                    limit: 10,
                    offset: 0,
                    total: 0,
                },
            },
            error: null,
            busy: false,
            formData: {
                name: '',
                password: '',
            },
        };
    },
    validations: {
        formData: {
            name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(255),
            },
            password: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(255),
            },
        },
    },
    computed: {

    },
    methods: {
        async submit() {
            if (this.busy) return;

            this.busy = true;
            this.error = null;

            try {
                const { name, password } = this.formData;

                await this.$store.dispatch('auth/triggerLogin', { name, password });

                await this.$nuxt.$router.push(this.$nuxt.$router.history.current.query.redirect || '/');
            } catch (e) {
                if (e instanceof Error) {
                    this.error = e.message;
                }
            }

            this.busy = false;
        },
    },
};
</script>
<template>
    <div class="container">
        <h4>
            Login
        </h4>

        <div class="text-center">
            <c-t-scan
                :width="400"
                height="auto"
            />
        </div>

        <div class="row mt-3">
            <div class="col-12 mb-sm-0 mb-3">
                <transition name="slide-fade">
                    <div
                        v-if="error"
                        class="alert alert-danger alert-sm"
                    >
                        {{ error }}
                    </div>
                </transition>

                <form @submit.prevent="submit">
                    <div
                        class="form-group"
                        :class="{ 'form-group-error': $v.formData.name.$error }"
                    >
                        <label for="name">Name</label>
                        <input
                            id="name"
                            v-model="$v.formData.name.$model"
                            class="form-control"
                            type="text"
                            placeholder="username or e-mail"
                            autocomplete="username"
                            required
                            autofocus
                        >

                        <div
                            v-if="!$v.formData.name.required && !$v.formData.name.$model"
                            class="form-group-hint group-required"
                        >
                            Please enter a username or email address.
                        </div>
                        <div
                            v-if="!$v.formData.name.minLength"
                            class="form-group-hint group-required"
                        >
                            The length of the name must be greater than <strong>{{ $v.formData.name.$params.minLength.min }}</strong> characters.
                        </div>
                        <div
                            v-if="!$v.formData.name.maxLength"
                            class="form-group-hint group-required"
                        >
                            The length of the name must be less than <strong>{{ $v.formData.name.$params.maxLength.max }}</strong> characters.
                        </div>
                    </div>

                    <div
                        class="form-group"
                        :class="{ 'form-group-error': $v.formData.password.$error }"
                    >
                        <label for="password">Password</label>
                        <input
                            id="password"
                            v-model="$v.formData.password.$model"
                            class="form-control"
                            type="password"
                            placeholder="password"
                            autocomplete="current-password"
                            required
                        >

                        <div
                            v-if="!$v.formData.password.required && !$v.formData.password.$model"
                            class="form-group-hint group-required"
                        >
                            Please enter a password.
                        </div>
                        <div
                            v-if="!$v.formData.password.minLength"
                            class="form-group-hint group-required"
                        >
                            The length of the password must be greater than <strong>{{ $v.formData.name.$params.minLength.min }}</strong> characters.
                        </div>
                        <div
                            v-if="!$v.formData.password.maxLength"
                            class="form-group-hint group-required"
                        >
                            The length of the password must be less than <strong>{{ $v.formData.name.$params.maxLength.max }}</strong> characters.
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            class="btn btn-primary btn-sm"
                            :disabled="$v.formData.$invalid || busy"
                            @click.prevent="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
