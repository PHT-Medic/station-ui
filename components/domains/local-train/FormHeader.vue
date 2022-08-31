<script lang="ts">
import Vue, { PropType } from 'vue';
import { ConfigurationState } from '../../../domains/local-trains';

export default Vue.extend({
    name: 'FormHeader',
    props: {
        step: String,
        name: String,
    },
    data() {
        return {
            configurationSteps: [
                {
                    text: 'Base',
                    value: ConfigurationState.base.valueOf(),
                    step: 0,
                },
                {
                    text: 'Image',
                    value: ConfigurationState.image.valueOf(),
                    step: 1,
                },
                {
                    text: 'Files',
                    value: ConfigurationState.files.valueOf(),
                    step: 2,
                },
                {
                    text: 'Run Configuration',
                    value: ConfigurationState.run.valueOf(),
                    step: 3,
                },

            ],
        };
    },
    computed: {
        configurationStep() {
            return this.configurationSteps.find((step) => step.value === this.step);
        },
        activeStep() {
            return this.configurationSteps.findIndex((step) => step.value === this.step);
        },
    },
});

</script>

<template>
    <div class="container-fluid justify-content-center pb-2 mb-2 border-bottom">
        <div class="row">
            {{ name }}
        </div>
        <div class="row">
            <div
                v-for="(s, index) in configurationSteps"
                :key="s.step"
                class="col text-center align-items-center justify-content-center text-white border border-left border-right"
                :class="{
                    'bg-success': index < activeStep,
                    'bg-secondary': s.value !== step,
                    'bg-primary': s.value === step,
                }"
            >
                {{ s.text }}
            </div>
        </div>
    </div>
</template>

<style scoped>

.active  {
    border-bottom: #2e6da4 solid 2px;
}

</style>
