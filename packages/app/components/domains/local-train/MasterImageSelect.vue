<script lang="ts">
import Vue, { PropType } from 'vue';
import { LocalTrainMasterImage } from '../../../domains/local-trains';

export default Vue.extend({
    data() {
        return {
            busy: false,
            masterImages: [],
            selectedGroup: undefined,
            selectedImage: undefined,
        };
    },

    computed: {
        masterImageGroups() {
            if (this.masterImages.length === 0) return [];
            const groups = [...new Set(this.masterImages.map((item) => item.group))];
            console.log(groups);
            return groups;
        },
        masterImageGroupOptions() {
            return this.masterImageGroups.map((group) => ({
                text: this.prettyPrint(group),
                value: group,
            }));
        },
        groupImageOptions() {
            if (!this.selectedGroup) return [];
            const images = this.masterImages.filter((item) => item.group === this.selectedGroup);
            return images.map((item) => ({
                text: item.artifact,
                value: item.id,
            }));
        },
    },
    created() {
        Promise.resolve()
            .then(this.load);
    },

    methods: {
        async load() {
            if (this.busy) return;

            this.busy = true;

            try {
                this.masterImages = await this.$stationApi.localTrain.masterImageGetMany();
            } catch (e) {
                if (e instanceof Error) {
                    this.$emit('failed', e);
                }
            }

            this.busy = false;
        },

        prettyPrint(value: string | null): string {
            if (value === null) return '-';
            if (value.length === undefined) return '-';
            return value.replace(/(-|^)([^-]?)/g, (_, prep, letter) => (prep && ' ') + letter.toUpperCase());
        },
    },
});
</script>
<template>
    <div class="d-flex flex-fill flex-row justify-content-around">
        <div class="d-flex fill">
            <div>
                <b-form-group
                    id="label-group"
                    label-cols-sm="4"
                    label-cols-lg="3"
                    content-cols-sm
                    content-cols-lg="7"
                    label="Select master image"
                    label-for="select-group"
                >
                    <b-form-select
                        id="select-group"
                        v-model="selectedGroup"
                        :options="masterImageGroupOptions"
                    />
                </b-form-group>
            </div>
        </div>
        <div class="d-flex fill">
            <div>
                <b-form-group
                    id="label-image"
                    label-cols-sm="4"
                    label-cols-lg="3"
                    content-cols-sm
                    content-cols-lg="7"
                    label="Select base image from group"
                    label-for="select-artifact"
                >
                    <b-form-select
                        id="select-artifact"
                        v-model="selectedImage"
                        :options="groupImageOptions"
                    />
                </b-form-group>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
