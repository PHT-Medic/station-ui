<!--
  Copyright (c) 2021-2021.
  Author Peter Placzek (tada5hi)
  For the full copyright and license information,
  view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import { LayoutKey, LayoutNavigationID } from '../../config/layout/contants';

export default {
    meta: {
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.NAVIGATION_ID]: LayoutNavigationID.DEFAULT,
    },
    data() {
        return {
            sidebar: {
                hide: false,
                items: [
                    // {
                    //     name: 'Create',
                    //     urlSuffix: '/add',
                    //     icon: 'fa fa-plus',
                    // },
                    {
                        name: 'Overview',
                        urlSuffix: '',
                        icon: 'fa fa-bars',
                    },
                ],
            },
        };
    },
};
</script>
<template>
    <div>
        <h1 class="title no-border mb-3">
            🚊 Train(s) <span class="sub-title">Manage trains</span>
        </h1>
        <div class="content-wrapper">
            <div class="content-sidebar flex-column">
                <b-nav
                    pills
                    vertical
                >
                    <b-nav-item
                        v-for="(item,key) in sidebar.items"
                        :key="key"
                        :disabled="item.active"
                        :to="'/trains' + item.urlSuffix"
                        exact
                        exact-active-class="active"
                    >
                        <i :class="item.icon" />
                        {{ item.name }}
                    </b-nav-item>
                </b-nav>
            </div>
            <div class="content-container">
                <nuxt-child />
            </div>
        </div>
    </div>
</template>
