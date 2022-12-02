<!--
  - Copyright (c) 2022.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->

<script lang="ts">
import Vue from 'vue';
import TrainName from '../../components/domains/train/TrainName.vue';
import { LayoutKey, LayoutNavigationID } from '../../config/layout/contants';

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
            const item = await context.$stationApi.train.getOne(context.params.id);

            return {
                item,
            };
        } catch (e) {
            await context.redirect('/trains');

            return {

            };
        }
    },
    data() {
        return {
            item: null,
            tabs: [
                { name: 'Overview', icon: 'fas fa-bars', urlSuffix: '' },
                { name: 'Executions', icon: 'fas fa-list-check', urlSuffix: '/executions' },
            ],
        };
    },
    methods: {
        handleUpdated(data) {
            const keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
                Vue.set(this.item, keys[i], data[keys[i]]);
            }
        },
    },
};
</script>
<template>
    <div>
        <h1 class="title no-border mb-3">
            🚊 Train
            <span class="sub-title">
                <train-name
                    :train-id="item.train_id"
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
                                    :to="'/trains'"
                                    exact
                                    exact-active-class="active"
                                >
                                    <i class="fa fa-arrow-left" />
                                </b-nav-item>

                                <b-nav-item
                                    v-for="(tab,key) in tabs"
                                    :key="key"
                                    :disabled="tab.active"
                                    :to="'/trains/' + item.train_id + tab.urlSuffix"
                                    :active="$route.path.startsWith('/trains/'+ item.id + tab.urlSuffix) && tab.urlSuffix.length !== 0"
                                    :class="{ 'active': $route.path.startsWith('/trains/'+ item.id + tab.urlSuffix) && tab.urlSuffix.length !== 0 }"
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
