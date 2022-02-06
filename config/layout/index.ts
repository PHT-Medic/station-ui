/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { NavigationComponentConfig } from 'vue-layout-navigation';
import { LayoutKey, LayoutNavigationID } from './contants';

export const LayoutTopNavigation : NavigationComponentConfig[] = [
    {
        id: LayoutNavigationID.DEFAULT,
        name: 'Home',
        icon: 'fa fa-home',
    },
];

export const LayoutSideDefaultNavigation : NavigationComponentConfig[] = [
    {
        name: 'Info',
        type: 'link',
        url: '/',
        icon: 'fas fa-info',
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        rootLink: true,
    },
    {
        name: 'Trains',
        type: 'link',
        icon: 'fas fa-train',
        requireLoggedIn: true,
        requirePermissions: [

        ],
        components: [
            {
                name: 'Central',
                type: 'link',
            },
            {
                name: 'Local',
                type: 'link',
            },
        ],
    },
    {
        name: 'Others',
        type: 'separator',
    },
    {
        name: 'Login',
        type: 'link',
        url: '/login',
        icon: 'fas fa-sign',
        [LayoutKey.REQUIRED_LOGGED_OUT]: true,
    },
];

export const LayoutSideAdminNavigation : NavigationComponentConfig[] = [

];
