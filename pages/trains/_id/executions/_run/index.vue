<script lang="ts">
import { PropType } from 'vue';
import { Train } from '../../../../../domains/train';

export default {
    props: {
        entity: {
            type: Object as PropType<Train>,
            default: undefined,
        },
    },
};
</script>

<template>
    <div>
        Execution id {{ entity.train_id }}
    </div>
</template>

<style scoped>

</style>
