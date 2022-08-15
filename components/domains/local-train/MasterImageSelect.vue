<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
    data() {
        return {
            busy: false,
            masterImages: [],
            selectedGroup: undefined,
            selectedImage: undefined,
            masterImageType: 'pht',
            customImage: '',
            masterImageOptions: [
                {
                    text: 'PHT',
                    value: 'pht',
                },
                {
                    text: 'Custom',
                    value: 'custom',
                },
            ],
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
        imageSelected(): boolean {
            return (this.selectedImage !== undefined) && (this.customImage !== '');
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
        handleSelect() {
            const imageSelect = {
                masterImageId: this.selectedImage,
                customImage: this.customImage,
            };
            console.log(imageSelect);
            this.$emit('imageSelected', imageSelect);
        },
    },
});
</script>
<template>
    <div class="container-fluid">
        <div class="container row">
            <b-form-group
                label="Select custom image or PHT master image."
                label-for="master-image-type"
            >
                <b-form-radio-group
                    id="master-image-type"
                    v-model="masterImageType"
                    :options="masterImageOptions"
                    button-variant="outline-primary"
                    size="md"
                    name="radio-btn-outline"
                    buttons
                />
            </b-form-group>
        </div>
        <div
            v-if="masterImageType === 'pht'"
            class="row"
        >
            <div class="col">
                <b-form-group
                    id="label-group"
                    label="Select master image"
                    label-for="select-group"
                    label-size="sm"
                >
                    <b-form-select
                        id="select-group"
                        v-model="selectedGroup"
                        :options="masterImageGroupOptions"
                    />
                </b-form-group>
            </div>
            <div class="col">
                <b-form-group
                    id="label-image"
                    label="Select base image from group"
                    label-for="select-artifact"
                    label-size="sm"
                >
                    <b-form-select
                        id="select-artifact"
                        v-model="selectedImage"
                        :options="groupImageOptions"
                    />
                </b-form-group>
            </div>
        </div>
        <div
            v-if="masterImageType === 'custom'"
            class="row"
        >
            <div class="col">
                <b-form-group
                    id="label-image"
                    label="Enter custom image"
                    label-for="custom-image"
                    label-size="sm"
                >
                    <b-form-input
                        id="custom-image"
                        v-model="customImage"
                    />
                </b-form-group>
            </div>
        </div>
        <div class="container row justify-content-between">
            <button
                class="btn btn-primary"
                @click="$emit('back')"
            >
                Back
            </button>
            <b-button
                class="btn-primary"
                :disabled="imageSelected"
                @click="handleSelect()"
            >
                Next
            </b-button>
        </div>
    </div>
</template>
<style scoped>

</style>
