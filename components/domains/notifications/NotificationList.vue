<script lang="ts">
import { PropType } from 'vue';
import { Notification } from '../../../domains/notifications';
import NotificationItem from './NotificationItem.vue';

export default {
    name: 'NotificationList',
    components: { NotificationItem },
    props: {
        items: {
            type: Array as PropType<Notification[]>,
            default: undefined,
        },
    },
    data() {
        return {
            busy: false,
            notifications: [],
        };
    },
    created() {
        if (this.items) {
            this.notifications = this.items;
        }
    },
    methods: {
        async handleDelete(id: number) {
            await this.$stationApi.notification.markAsRead(id);
            this.notifications = this.notifications.filter((n) => n.id !== id);
        },
        async handleRead(id: number) {
            await this.$stationApi.notification.delete(id);
            this.notifications = this.notifications.filter((n) => n.id !== id);
        },
    },
};
</script>

<template>
    <div class="d-flex flex-grow-1">
        <div
            v-if="items.length === 0 || items === undefined"
            class="alert alert-sm alert-warning d-flex flex-grow-1"
        >
            No new notifications available...
        </div>
        <div
            v-else
            class="d-flex flex-column flex-grow-1"
        >
            <div
                v-for="(item,key) in notifications"
                :key="key"
                class="c-list-item mb-2"
            >
                <notification-item
                    :item="item"
                    @read="handleRead"
                    @delete="handleDelete"
                />
            </div>

        </div>
    </div>
</template>

<style scoped>

</style>
