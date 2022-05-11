<template>
    <div class="container">
        <h2>Add FHir server</h2>
        Hello
        <ServerAddForm />
    </div>
</template>

<script lang="ts">

import ServerAddForm from '../../../components/domains/data/fhir/ServerAddForm.vue';

export default {
    name: 'Add',
    components: {
        ServerAddForm,
    },
};
</script>

<style scoped>

</style>
