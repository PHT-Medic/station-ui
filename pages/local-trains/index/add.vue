<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <local-train-form />
            </div>
            <div class="col">
                <h2>File Upload</h2>
            </div>
        </div>
    </div>
</template>

<script>
import LocalTrainForm from '../../../components/domains/local-train/LocalTrainForm';

export default {
    name: 'Add',
    components: {
        LocalTrainForm,
    },
};
</script>

<style scoped>

</style>
