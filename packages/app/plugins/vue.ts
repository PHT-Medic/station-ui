/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */
import AuthVue from '@typescript-auth/vue';
import Vue from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Gravatar from 'vue-gravatar';

import Pagination from '../components/Pagination.vue';

Vue.use(AuthVue);
Vue.component('VGravatar', Gravatar);
Vue.component('Pagination', Pagination);

Vue.filter('str_length_limit', (value, size) => {
    if (!value) return '';
    value = value.toString();

    if (value.length <= size) {
        return value;
    }
    return `${value.substr(0, size)}...`;
});
