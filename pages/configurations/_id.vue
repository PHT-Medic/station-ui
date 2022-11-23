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
            const item = await context.$stationApi.configuration.getOne(context.params.id);

            return {
                item,
            };
        } catch (e) {
            await context.redirect('/configurations');

            return {

            };
        }
    },
    data() {
        return {
            item: null,
            tabs: [
                { name: 'Overview', icon: 'fas fa-bars', urlSuffix: '' },
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
            <i class="fa-solid fa-tools" /> Config
        </h1>

        <div class="m-b-20 m-t-10">
            <div class="panel-card">
                <div class="panel-card-body">
                    <div class="flex-wrap flex-row d-flex align-items-center">
                        <div>
                            <b-nav pills>
                                <b-nav-item
                                    :to="'/configurations'"
                                    exact
                                    exact-active-class="active"
                                >
                                    <i class="fa fa-arrow-left" />
                                </b-nav-item>

                                <b-nav-item
                                    v-for="(tab,key) in tabs"
                                    :key="key"
                                    :disabled="tab.active"
                                    :to="'/configurations/' + item.train_id + tab.urlSuffix"
                                    :active="$route.path.startsWith('/configurations/'+item.id + tab.urlSuffix) && tab.urlSuffix.length !== 0"
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
