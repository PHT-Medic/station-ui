<template>
    <div>
        Summary {{ entity.name }}
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Dataset } from '../../../../domains/datasets/type';

export default {
    name: 'Stats',
    props: {
        entity: {
            type: Object as PropType<Dataset>,
            required: true,
        },

    },
};
</script>

<style scoped>

</style>
