<!--
  Copyright (c) 2021-2021.
  Author Peter Placzek (tada5hi)
  For the full copyright and license information,
  view the LICENSE file that was distributed with this source code.
  -->
<script>
import { PermissionID } from '@personalhealthtrain/central-common';
import { LayoutKey, LayoutNavigationID } from '../../../config/layout/contants';

export default {
    meta: {
        [LayoutKey.NAVIGATION_ID]: LayoutNavigationID.ADMIN,
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.REQUIRED_PERMISSIONS]: [
            PermissionID.ROLE_EDIT,
            PermissionID.ROLE_PERMISSION_ADD,
            PermissionID.ROLE_PERMISSION_DROP,
        ],
    },
    async asyncData(context) {
        try {
            const entity = await context.$authApi.role.getOne(context.params.id);

            return {
                entity,
            };
        } catch (e) {
            await context.redirect('/admin/roles');

            return {

            };
        }
    },
    data() {
        return {
            entity: null,
            tabs: [
                {
                    name: 'General', icon: 'fas fa-bars', urlSuffix: '',
                },
                {
                    name: 'Permissions', icon: 'fas fa-user-secret', urlSuffix: 'permissions',
                },
                {
                    name: 'Users', icon: 'fa fa-users', urlSuffix: 'users',
                },
            ],
        };
    },
    methods: {
        handleUpdated(item) {
            const keys = Object.keys(item);
            for (let i = 0; i < keys.length; i++) {
                this.entity[keys[i]] = item[keys[i]];
            }

            this.$bvToast.toast('The role was successfully updated.', {
                toaster: 'b-toaster-top-center',
                variant: 'success',
            });
        },
        async handleFailed(e) {
            this.$bvToast.toast(e.message, {
                toaster: 'b-toaster-top-center',
                variant: 'warning',
            });
        },
    },
};
</script>
<template>
    <div class="container">
        <h1 class="title no-border mb-3">
            {{ entity.name }} <span class="sub-title">Details</span>
        </h1>

        <div class="m-b-20 m-t-10">
            <div class="panel-card">
                <div class="panel-card-body">
                    <b-nav pills>
                        <b-nav-item
                            :to="'/admin/roles'"
                            exact
                            exact-active-class="active"
                        >
                            <i class="fa fa-arrow-left" />
                        </b-nav-item>
                        <b-nav-item
                            v-for="(item,key) in tabs"
                            :key="key"
                            :disabled="item.active"
                            :to="'/admin/roles/' + entity.id + '/' + item.urlSuffix"
                            exact
                            exact-active-class="active"
                        >
                            <i :class="item.icon" />
                            {{ item.name }}
                        </b-nav-item>
                    </b-nav>
                </div>
            </div>
        </div>

        <nuxt-child
            :entity="entity"
            @updated="handleUpdated"
            @failed="handleFailed"
        />
    </div>
</template>
