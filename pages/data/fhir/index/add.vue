<template>
    <div>
        <h2>Add FHIR server</h2>
        <ServerAddForm
            @created="handleCreated"
            @updated="handleCreated"
        />
    </div>
</template>

<script lang="ts">

import ServerAddForm from '../../../../components/domains/data/fhir/ServerAddForm.vue';

export default {
    name: 'Add',
    components: {
        ServerAddForm,
    },
    methods: {
        handleCreated(server) {
            this.$router.push(`/data/fhir/${server.id}`);
        },
    },
};
</script>

<style scoped>

</style>
