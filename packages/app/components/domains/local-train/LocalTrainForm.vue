<script lang="ts">
import Vue, { PropType } from 'vue';
import { LocalTrain } from '../../../domains/local-trains';
import MasterImageSelect from './MasterImageSelect.vue';

export default Vue.extend({
    name: 'LocalTrainForm',
    props: {
        train: {
            type: Object as PropType<LocalTrain>,
            default: undefined,
        },
    },
    components: {
        MasterImageSelect,
    },
});
</script>
<template>
    <div class="d-flex flex-fill flex-column">
        <h5>Local Train Form</h5>
        <master-image-select />
    </div>
</template>
<style scoped>

</style>
