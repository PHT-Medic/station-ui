<script lang="ts">
export default {
    name: 'Airflow',
};
</script>

<template>
    <div>
        <h1>Airflow</h1>
        <p>{{ $config.airflowUrl }}</p>

        <iframe
            :src="$config.airflowUrl"
            width="100%"
            height="100%"
        />
    </div>
</template>

<style scoped>

</style>
