<!--
  Copyright (c) 2021-2021.
  Author Peter Placzek (tada5hi)
  For the full copyright and license information,
  view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
export default {
    async asyncData(ctx) {
        const notifications = await ctx.$stationApi.notification.getNotifications();
        return {
            notifications,
        };
    },
    data() {
        return {
            busy: false,
            notifications: [],
            timer: '',
        };
    },
    computed: {
        loggedIn(vm) {
            return vm.$store.getters['auth/loggedIn'];
        },
        user(vm) {
            return vm.$store.state.auth.user;
        },
        infoText(vm) {
            if (!vm.user) {
                return 'PHT';
            }

            if (vm.user.realm) {
                return vm.user.realm.name;
            }

            return vm.user.realm_id[0].toUpperCase() + vm.user.realm_id.slice(1);
        },
        unreadNotifications() {
            return this.notifications.filter((notification) => !notification.is_read);
        },
    },
    created() {
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        this.timer = setInterval(this.getNotifications, 10000);
    },
    destroyed() {
        clearInterval(this.timer);
    },
    methods: {
        getNotifications() {
            if (this.busy) return;
            this.busy = true;

            this.$stationApi.notification.getMany()
                .then((notifications) => {
                    this.notifications = notifications;
                })
                .catch((e) => {
                    if (e instanceof Error) {
                        this.$emit('failed', e);
                    }
                })
                .finally(() => {
                    this.busy = false;
                });
        },
    },
};
</script>
<template>
    <div>
        <header class="page-header fixed-top">
            <div class="header-title">
                <div class="toggle-box">
                    <button
                        v-b-toggle="'page-navbar'"
                        type="button"
                        class="toggle-trigger"
                    >
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar" />
                        <span class="icon-bar" />
                        <span class="icon-bar" />
                    </button>
                </div>
                <div class="logo">
                    <span>S</span>T<span>A</span>T<span>I</span>O<span>N</span> U<span>I</span>
                    <span class="info-text">{{ infoText }}</span>
                </div>
            </div>
            <nav class="page-navbar navbar-expand-md">
                <b-collapse
                    id="page-navbar"
                    class="navbar-content navbar-collapse"
                >
                    <navigation-components
                        class="navbar-nav"
                        :tier="0"
                    />
                    <ul
                        v-if="loggedIn && user"
                        class="navbar-nav nav-items navbar-gadgets"
                    >
                        <li class="nav-item">
                            <div class="dropdown">
                                <div
                                    class="nav-link dropdown-toggle"
                                    data-toggle="dropdown"
                                >
                                    <div
                                        class="notification-wrapper"
                                    >
                                        <i
                                            class="fa fa-bell"
                                            style="font-size: 16px"
                                        />
                                        <span
                                            v-if="unreadNotifications.length > 0"
                                            class="notification-badge"
                                        >
                                            {{ unreadNotifications.length }}
                                        </span>
                                    </div>
                                </div>
                                <div class="dropdown-menu">
                                    Dropdown
                                </div>
                            </div>
                        </li>
                        <li class="nav-item">
                            <nuxt-link
                                class="nav-link user-link"
                                :to="'/users/'+user.id"
                            >
                                <v-gravatar :email="user.email ? user.email : ''" />
                                <span>{{ user.display_name ? user.display_name : user.name }}</span>
                            </nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link
                                :to="'/logout'"
                                class="nav-link"
                            >
                                <i class="fa fa-power-off" />
                            </nuxt-link>
                        </li>
                    </ul>
                </b-collapse>
            </nav>
        </header>
    </div>
</template>

<style scoped>
.notification-wrapper  {
    position: relative;
}

.notification-wrapper .notification-badge {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #0066ff;
    color: #ffffff;
    border-radius: 50%;
    padding: 2px 5px;
    font-size: 10px;
    font-weight: bold;
    margin: -10px 10px 0;
}

</style>
