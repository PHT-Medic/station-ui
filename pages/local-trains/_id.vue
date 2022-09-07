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
        console.log('data', trainData);
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
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">General</h5>
                    </div>
                    <div class="card-body">
                        <div class="col">
                            <div>
                                {{ train.state.status }}
                            </div>
                            <div>
                                Status
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <timeago :datetime="train.created_at"/>
                            </div>
                            <div>
                                Created
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mt-4">
                    <div class="card-header">
                        <h5 class="card-title">Configuration</h5>
                    </div>
                    <div class="card-body">
                    </div>
                </div>
                <div class="card mt-4">
                    <div class="card-header">
                        <h5 class="card-title">Data</h5>
                    </div>
                    <div class="card-body">
                    </div>
                </div>
            </div>
            <div class="col">
                <file-list
                    :files="files"
                />
            </div>
        </div>
    </div>
</template>
