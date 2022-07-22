<script lang="ts">
import Vue, { PropType } from 'vue';
import { LocalTrain } from '../../../domains/local-trains';

export default Vue.extend({
    name: 'LocalTrainForm',
    props: {
        train: {
            type: Object as PropType<LocalTrain>,
            default: undefined,
        },
    },
});
</script>
<template>
    <div>
        Local Train Form
    </div>
</template>
<style scoped>

</style>
