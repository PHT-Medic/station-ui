<script lang="ts">
import Vue, { PropType } from 'vue';
import { MinioFile } from '../../../domains/files/type';

export default Vue.extend({
    name: 'FileSelect',
    props: {
        files: {
            type: Array as PropType<MinioFile[]>,
            required: false,
        },
    },
    data() {
        return {
            busy: false,
            selectedFile: null,
        };
    },
    computed: {
        fileOptions() {
            return this.files.map((file) => ({
                value: file.file_name,
                text: file.file_name,
            }));
        },
    },
});
</script>

<template>
    <div class="form-group">
        <b-form-select
            v-model="selectedFile"
            :options="fileOptions"
            size="md"
            @change="$emit('fileSelect', selectedFile)"
        />
    </div>
</template>

<style scoped>

</style>
