<script>
import DatasetAddForm from '../../../../components/domains/data/dataset/DatasetAddForm';

export default {
    name: 'Add',
    components: { DatasetAddForm },
    methods: {
        handleCreated() {
            this.$router.push('/data/datasets');
        },
    },
};
</script>

<template>
    <div>
        <DatasetAddForm />
    </div>
</template>

<style scoped>

</style>
