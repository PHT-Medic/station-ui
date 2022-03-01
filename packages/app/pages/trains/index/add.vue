<script>
import TrainForm from '../../../components/domains/train/TrainForm';

export default {
    components: { TrainForm },
    methods: {
        handleCreated() {
            this.$router.push('/trains');
        },
    },
};
</script>
<template>
    <train-form @created="handleCreated" />
</template>
