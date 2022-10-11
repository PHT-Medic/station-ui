<script lang="ts">
import Vue, { PropType } from 'vue';
import { Dataset } from '../../../../domains/datasets';
import { MinioFile } from '../../../../domains/files/type';

export default Vue.extend({
    name: 'Stats',
    props: {
        entity: {
            type: Object as PropType<Dataset>,
            required: true,
        },
        files: {
            type: Array as PropType<MinioFile[]>,
            required: false,
        },
    },
});
</script>

<template>
    <div>
        Summary {{ entity.name }}
    </div>
</template>

<style scoped>

</style>
