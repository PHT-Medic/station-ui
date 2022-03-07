<!--
  - Copyright (c) 2022.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script>
import Vue from 'vue';

export default Vue.extend({
    async asyncData(ctx) {
        const { id } = ctx.params;

        if (id.length < 3) {
            await ctx.redirect('/');
            return {

            };
        }

        return {
            id,
        };
    },
    data() {
        return {
            id: null,
        };
    },
});
</script>
<template>
    <div>
        Hello ID: {{ id }}
    </div>
</template>
