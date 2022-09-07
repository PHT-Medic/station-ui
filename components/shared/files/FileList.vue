<script lang="ts">

import { PropType } from 'vue';
import { MinioFile } from '../../../domains/files/type';

export default {
    name: 'FileList',
    props: {
        files: {
            type: Array as PropType<MinioFile[]>,
            required: true,
        },
    },
    data() {
        return {
            busy: false,
            uploadFiles: this.files,
        };
    },
    computed: {
        allFiles() {
            return this.files.concat(this.uploadFiles);
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
        removeFile(file: MinioFile) {
            this.$emit('removeFile', file);
        },
        viewFile(file: MinioFile) {
            this.$emit('viewFile', file);
        },
        addFile(file) {
            const droppedFiles = file.dataTransfer.files;
            console.log('dropped files', droppedFiles);
            if (!droppedFiles) return;

            ([...droppedFiles]).forEach((f) => {
                this.uploadFiles.push(f);
            });
            this.$emit('uploadFiles', droppedFiles);
            this.uploadFiles = this.uploadFiles.map(
                (file) => ({
                    file_name: file.name,
                    size: file.size,
                    full_path: file.name,
                    updated_at: new Date(file.lastModified),
                    created_at: new Date(file.lastModified),
                }),
            );
        },
    },
};
</script>

<template>
    <div class="">
        <h3>🗎 Files</h3>
        <div
            class="file-list border rounded p-2 shadow-sm"
            @drop.prevent="addFile"
            @dragover.prevent
        >
            <table
                v-if="files.length > 0"
                class="table table-hover"
            >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Last Modified</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="file in files"
                        :key="file.full_path"
                    >
                        <td>{{ file.file_name }}</td>
                        <td>{{ formatBytes(file.size) }}</td>
                        <td>
                            <timeago :datetime="file.updated_at" />
                        </td>
                        <td>
                            <slot :file="file">
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
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div
                v-else
                class="w-100 h-100 justify-content-center"
            >
                <i class="fas fa-file-arrow-up" />
                <span class="ml-2">
                    Drag and drop files to upload
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>

.file-list {
    overflow-y: auto;
    max-height: 300px;
    min-height: 20rem;
}

</style>
