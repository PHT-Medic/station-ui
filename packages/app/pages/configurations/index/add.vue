<script>
import ConfigForm from '../../../components/domains/config/ConfigForm';

export default {
    components: { ConfigForm },
    methods: {
        handleCreated() {
            this.$router.push('/configurations');
        },
    },
};
</script>
<template>
    <config-form @created="handleCreated" />
</template>
