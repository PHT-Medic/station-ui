<script lang="ts">
import Vue from 'vue';
import TrainName from '../../../components/domains/train/TrainName.vue';
import { LayoutKey, LayoutNavigationID } from '../../../config/layout';

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
            const item = await context.$stationApi.fhir.get(context.params.id);
            return {
                item,
            };
        } catch (e) {
            await context.redirect('/data/fhir');

            return {

            };
        }
    },
    data() {
        return {
            item: null,
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
            🔥 FHIR Server
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
                                    :to="'/data/fhir'"
                                    exact
                                    exact-active-class="active"
                                >
                                    <i class="fa fa-arrow-left" />
                                </b-nav-item>

                                <b-nav-item
                                    v-for="(tab,key) in tabs"
                                    :key="key"
                                    :disabled="tab.active"
                                    :to="'/data/fhir/' + item.id + tab.urlSuffix"
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
            @updated="handleUpdated"
        />
    </div>
</template>

<style>

</style>
