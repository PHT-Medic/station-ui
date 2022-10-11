<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ServerSelect',
    data() {
        return {
            busy: false,
            items: [],
            selected: null,
        };
    },
    computed: {
        selectedServer() {
            return this.items.find((item) => item.id === this.selected);
        },
        serverOptions() {
            return this.items.map((item) => ({
                value: item.id,
                text: item.name,
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
                this.items = await this.$stationApi.fhir.getMany();
                console.log('ServerSelect.load', this.items);
            } catch (e) {
                if (e instanceof Error) {
                    this.$emit('failed', e);
                }
            }

            this.busy = false;
        },
    },
});
</script>

<template>
    <div class="form-group">
        <label>Choose an existing server</label>
        <b-form-select
            v-model="selected"
            :options="serverOptions"
            size="sm"
            @change="$emit('serverSelected', selected)"
        />
    </div>
</template>

<style scoped>

</style>
