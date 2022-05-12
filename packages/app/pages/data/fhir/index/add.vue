<template>
    <div>
        <h2>Add FHIR server</h2>
        <ServerAddForm />
    </div>
</template>

<script lang="ts">

import ServerAddForm from '../../../../components/domains/data/fhir/ServerAddForm.vue';

export default {
    name: 'Add',
    components: {
        ServerAddForm,
    },
};
</script>

<style scoped>

</style>
