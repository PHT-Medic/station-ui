<script lang="ts">
import { PropType } from 'vue';
import ServerAddForm from '../../../../components/domains/data/fhir/ServerAddForm.vue';
import { FHIRServer } from '../../../../domains/fhir';

export default {
    components: { ServerAddForm },
    props: {
        entity: {
            type: Object as PropType<FHIRServer>,
            required: true,
        },
    },
};
</script>

<template>
    <div class="container-fluid">
        <server-add-form :entity="entity" />
    </div>
</template>

<style scoped>

</style>
