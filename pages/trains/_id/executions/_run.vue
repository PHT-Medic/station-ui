<script lang="ts">

import { LayoutKey, LayoutNavigationID } from '../../../../config/layout';

export default {
    meta: {
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.NAVIGATION_ID]: LayoutNavigationID.DEFAULT,
    },
    async asyncData(context) {
        try {
            console.log('context.params.run', context.params.run);
            const item = await context.$stationApi.train.getTrainExecution(context.params.run);
            console.log('item', item);

            return {
                item,
            };
        } catch (e) {
            console.log(e);
            await context.redirect('/trains');

            return {

            };
        }
    },
    data() {
        return {
            item: null,

        };
    },
};
</script>

<template>
    <div>
        Executions
    </div>
</template>

<style scoped>

</style>
