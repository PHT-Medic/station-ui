<script>
import DatasetAddForm from '../../../../components/domains/data/dataset/DatasetAddForm';

export default {
    name: 'Add',
    components: { DatasetAddForm },
    methods: {
        handleCreated(id) {
            console.log('handleCreated', id);
            this.$router.push(`/data/datasets/${id}`);
        },
    },
};
</script>

<template>
    <div>
        <DatasetAddForm
            @created="handleCreated"
            @updated="handleCreated"
        />
    </div>
</template>

<style scoped>

</style>
