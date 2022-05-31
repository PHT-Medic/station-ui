<script lang="ts">
import Vue, { PropType } from 'vue';
import { Train } from '../../../domains/train';

export default Vue.extend({
    name: 'TrainInfo',
    props: {
        entity: {
            type: Object as PropType<Train>,
            default: undefined,
        },
    },
});
</script>

<template>
    <div>
        Train info
    </div>
</template>

<style scoped>

</style>
