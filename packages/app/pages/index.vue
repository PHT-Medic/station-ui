<!--
  - Copyright (c) 2022.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import Vue from 'vue';
import { LayoutKey, LayoutNavigationID } from '../config/layout/contants';

export default Vue.extend({
    meta: {
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.NAVIGATION_ID]: LayoutNavigationID.DEFAULT,
    },
});
</script>
<template>
    <div>
        <h5>Placeholder 🔥</h5>
    </div>
</template>
