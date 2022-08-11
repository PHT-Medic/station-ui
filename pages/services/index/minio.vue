<script>
export default {
    name: 'Minio',
};
</script>

<template>
    <div>
        <h1>Airflow</h1>
        <p>{{ $config.minioUrl }}</p>

        <iframe
            :src="$config.minioUrl"
            width="100%"
            height="100%"
        />
    </div>
</template>

<style scoped>

</style>
