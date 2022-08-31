<script lang="ts">
import Vue, { PropType } from 'vue';
import { LocalTrain } from '../../../domains/local-trains';

export default Vue.extend({
    name: 'LocalTrainFiles',
    components: {
    },
    props: {
        train: {
            type: Object as PropType<LocalTrain>,
            default: undefined,
        },
    },
    data() {
        return {
            busy: false,
            files: [],
            entrypoint: '',
        };
    },
});
</script>

<template>
    <div>
        <h2>
            Run Configuration
        </h2>
    </div>
</template>

<style scoped>

</style>
