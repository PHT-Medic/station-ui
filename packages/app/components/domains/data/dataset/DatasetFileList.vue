<script lang="ts">

import { PropType } from 'vue';
import { DatasetFile } from '../../../../domains/datasets/type';

export default {
    name: 'DatasetFileList',
    props: {
        files: {
            type: Object as PropType<DatasetFile[]>,
            required: true,
        },
    },
    methods: {
        formatBytes(bytes: number) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
        },
        removeFile(file: DatasetFile) {
            this.$emit('removeFile', file);
        },
        viewFile(file: DatasetFile) {
            this.$emit('viewFile', file);
        },
    },
};
</script>

<template>
    <div>
        <h3>🗎 Files</h3>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Last Modified</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="file in files"
                    :key="file.full_path"
                >
                    <td>{{ file.file_name }}</td>
                    <td>{{ formatBytes(file.size) }}</td>
                    <td><timeago :datetime="file.updated_at" /></td>
                    <td>
                        <button
                            type="button"
                            class="btn btn-xs btn-primary"
                            @click.prevent="viewFile(file)"
                        >
                            <i class="fas fa-eye" />
                        </button>
                        <button
                            type="button"
                            class="btn btn-xs btn-danger"
                            @click.prevent="removeFile(file)"
                        >
                            <i class="fas fa-trash" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>

</style>
