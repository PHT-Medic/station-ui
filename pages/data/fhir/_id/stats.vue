<script lang="ts">
import { PropType } from 'vue';
import { FHIRServer } from '../../../../domains/fhir';

export default {
    props: {
        entity: {
            type: Object as PropType<FHIRServer>,
            required: true,
        },
    },
};
</script>

<template>
    <div>
        stats
    </div>
</template>

<style scoped>

</style>
