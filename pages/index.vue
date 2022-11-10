<!--
  - Copyright (c) 2022.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import Vue from 'vue';
import { LayoutKey, LayoutNavigationID } from '../config/layout/contants';
import TrainList from '../components/domains/train/TrainList.vue';
import LocalTrainList from '../components/domains/local-train/LocalTrainList.vue';
import ExecutionList from '../components/domains/train-executions/ExecutionList.vue';
import NotificationList from '../components/domains/notifications/NotificationList.vue';

export default Vue.extend({
    meta: {
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.NAVIGATION_ID]: LayoutNavigationID.DEFAULT,
    },
    components: {
        NotificationList,
        TrainList,
        LocalTrainList,
        ExecutionList,
    },
    async asyncData(context) {
        try {
            const trains = await context.$stationApi.train.getMany();
            const localTrains = await context.$stationApi.localTrain.getMany();
            const datasets = await context.$stationApi.datasets.getMany();
            const executions = await context.$stationApi.train.getAllExecutions(0, 5);
            const notifications = await context.$stationApi.notification.getMany(0, 5);

            return {
                trains,
                localTrains,
                datasets,
                executions,
                notifications,
            };
        } catch (e) {
            console.log(e);
            await context.redirect('/');
            return {
                trains: [],
                localTrains: [],
                datasets: [],
            };
        }
    },
    data: () => ({
        busy: false,
        trains: [],
        executions: [],
        localTrains: [],
        datasets: [],
        notifications: [],
    }),

});
</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-header">
                        <h4>
                            Recent 🚊 activity
                        </h4>
                    </div>
                    <div class="card-body">
                        <execution-list
                            :executions="executions"
                        />
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-header">
                        <h4>
                            🔔 Notifications
                        </h4>
                    </div>
                    <div class="card-body">
                        <NotificationList
                            :items="notifications"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col">
                <div class="card">
                    <div class="card-header">
                        <h4>
                            🚊 Trains
                        </h4>
                    </div>
                    <div class="card-body">
                        <train-list
                            :with-header="false"
                            :max-items="5"
                        />
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-header">
                        <h4>
                            🚊 Local Trains
                        </h4>
                    </div>
                    <div class="card-body">
                        <local-train-list :with-header="false"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
