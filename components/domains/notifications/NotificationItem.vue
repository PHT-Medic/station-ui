<script lang="ts">
import { PropType } from 'vue';

export default {
    name: 'NotificationItem',
    props: {
        item: {
            type: Object as PropType<Notification>,
            required: true,
        },
    },
    methods: {
        handleDelete() {
            this.$emit('delete', this.item.id);
        },
        handleRead() {
            this.$emit('read', this.item.id);
        },
    },
};

</script>

<template>
    <div class="container-fluid">
        <div class="col container-fluid">
            <div class="row">
                <nuxt-link
                    :to="'/notifications/' + item.id"
                >
                    <h6
                        class="mt-1 ml-1"
                    >
                        {{ item.title }}
                    </h6>
                </nuxt-link>
            </div>
            <div class="row">
                <div class="col">
                    <timeago
                        :datetime="item.created_at"
                        class="ml-1 font-weight-bold"
                        style="font-size: 1rem"
                    />
                </div>
                <div class="col">
                    <div class="d-flex justify-content-end">
                        <button
                            class="btn btn-info btn-xs"
                            @click="handleRead"
                        >
                            <i class="fas fa-check"></i>
                        </button>
                        <button
                            class="btn btn-danger btn-xs ml-1"
                            @click="handleDelete"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
