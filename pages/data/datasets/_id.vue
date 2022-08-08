<!--
  - Copyright (c) 2022.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import Vue from 'vue';
import { LayoutKey, LayoutNavigationID } from '../../../config/layout';
import TrainName from '../../../components/domains/train/TrainName.vue';

export default {
    meta: {
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.NAVIGATION_ID]: LayoutNavigationID.DEFAULT,
    },
    components: {
        TrainName,
    },
    async asyncData(context) {
        try {
            const item = await context.$stationApi.datasets.get(context.params.id);
            const files = await context.$stationApi.datasets.getFiles(context.params.id);
            return {
                item,
                files,
            };
        } catch (e) {
            await context.redirect('/data/datasets');

            return {

            };
        }
    },
    data() {
        return {
            item: null,
            files: null,
            tabs: [
                { name: 'Overview', icon: 'fas fa-bars', urlSuffix: '' },
                { name: 'Stats', icon: 'fas fa-chart-column', urlSuffix: '/stats' },
            ],
        };
    },
    methods: {
        async handleUpdated(id) {
            this.files = await this.$stationApi.datasets.getFiles(id);
        },
    },
};
</script>
<template>
    <div>
        <h1 class="title no-border mb-3">
            📂 Dataset
            <span class="sub-title">
                <train-name
                    :train-id="item.id"
                    :train-name="item.name"
                />
            </span>
        </h1>

        <div class="m-b-20 m-t-10">
            <div class="panel-card">
                <div class="panel-card-body">
                    <div class="flex-wrap flex-row d-flex align-items-center">
                        <div>
                            <b-nav pills>
                                <b-nav-item
                                    :to="'/data/datasets'"
                                    exact
                                    exact-active-class="active"
                                >
                                    <i class="fa fa-arrow-left" />
                                </b-nav-item>

                                <b-nav-item
                                    v-for="(tab,key) in tabs"
                                    :key="key"
                                    :disabled="tab.active"
                                    :to="'/data/datasets/' + item.id + tab.urlSuffix"
                                    :active="$route.path.startsWith('/data/datasets/'+item.id + tab.urlSuffix) && tab.urlSuffix.length !== 0"
                                    exact-active-class="active"
                                    exact
                                >
                                    <i :class="tab.icon" />
                                    {{ tab.name }}
                                </b-nav-item>
                            </b-nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <nuxt-child
            :entity="item"
            :files="files"
            @updated="handleUpdated"
        />
    </div>
</template>
