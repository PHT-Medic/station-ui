<script lang="ts">
import Vue from 'vue';
import TrainName from '../../components/domains/train/TrainName.vue';
import FileList from '../../components/shared/files/FileList.vue';

export default Vue.extend({
    components: {
        TrainName,
        FileList,
    },
    async asyncData(ctx) {
        const { id } = ctx.params;

        if (id.length < 3) {
            await ctx.redirect('/');
            return {

            };
        }
        const trainData = await ctx.$stationApi.localTrain.get(id).then(
            (response) => response,
            (error) => {
                if (error.response.status === 404) {
                    ctx.redirect('/local-trains');
                }
                return null;
            },
        );
        const trainFiles = await ctx.$stationApi.localTrain.getFiles(id).then(
            (response) => response,
            (error) => {
                if (error.response.status === 404) {
                    ctx.redirect('/local-trains');
                }
                return null;
            },
        );

        return {
            id,
            train: trainData,
            files: trainFiles,
        };
    },
    data() {
        return {
            id: null,
            train: null,
            files: [],
        };
    },
});
</script>
<template>
    <div class="container-fluid col">
        <h1 class="title no-border mb-3">
            🚊 Local Train
            <span class="sub-title">
                <train-name
                    :train-id="train.id"
                    :train-name="train.name"
                />
            </span>
        </h1>
        <hr>
        <div class="row">
            <div class="col">
                Info
            </div>
            <div class="col">
                <file-list
                    :files="files"
                />
            </div>
        </div>
    </div>
</template>
