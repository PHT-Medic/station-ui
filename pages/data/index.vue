<script lang="ts">
import { LayoutKey, LayoutNavigationID } from '../../config/layout';

export default {
    meta: {
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.NAVIGATION_ID]: LayoutNavigationID.DEFAULT,
    },
    data() {
        return {
        };
    },
};
</script>

<template>
    <div class="content-wrapper">
        <div class="content-container">
            <nuxt-child />
        </div>
    </div>
</template>
