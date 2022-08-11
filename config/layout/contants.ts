/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { Component } from '@vue-layout/navigation';
import { PermissionID } from '../../domains/auth/permission';

export enum LayoutKey {
    NAVIGATION_ID = 'navigationId',
    REQUIRED_LOGGED_IN = 'requireLoggedIn',
    REQUIRED_LOGGED_OUT = 'requireLoggedOut',

    REQUIRED_PERMISSIONS = 'requirePermissions',
    REQUIRED_ABILITIES = 'requireAbilities',
}

export enum LayoutNavigationID {
    ADMIN = 'admin',
    DEFAULT = 'default',
}

export const LayoutTopNavigation: Component[] = [
    {
        id: LayoutNavigationID.DEFAULT,
        name: 'Home',
        icon: 'fa fa-home',
    },
    {
        id: LayoutNavigationID.ADMIN,
        name: 'Admin',
        icon: 'fas fa-cog',
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.REQUIRED_PERMISSIONS]: [],
    },
];

export const LayoutSideDefaultNavigation: Component[] = [
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
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        requirePermissions: [],
        components: [
            {
                name: 'Central',
                type: 'link',
                icon: 'fas fa-network-wired',
                url: '/trains',
            },
            {
                name: 'Local',
                type: 'link',
                icon: 'fas fa-hard-drive',
                url: '/local-trains',
            },
        ],
    },
    {
        name: 'Data',
        type: 'link',
        icon: 'fa-solid fa-database',
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        components: [
            {
                name: 'Datasets',
                type: 'link',
                icon: 'fas fa-box-archive',
                url: '/data/datasets',
            },
            {
                name: 'FHIR',
                type: 'link',
                url: '/data/fhir',
                icon: 'fas fa-fire',
            },
        ],

    },
    {
        name: 'Configurations',
        type: 'link',
        url: '/configurations',
        icon: 'fa-solid fa-box',
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
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

export const LayoutSideAdminNavigation: Component[] = [
    {
        name: 'Auth',
        type: 'link',
        icon: 'fas fa-lock',
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.REQUIRED_PERMISSIONS]: [
            PermissionID.USER_ADD,
            PermissionID.USER_EDIT,
            PermissionID.USER_DROP,

            PermissionID.ROLE_ADD,
            PermissionID.ROLE_EDIT,
            PermissionID.ROLE_DROP,
            PermissionID.ROLE_PERMISSION_ADD,
            PermissionID.ROLE_PERMISSION_DROP,

            PermissionID.PERMISSION_ADD,
            PermissionID.PERMISSION_EDIT,
            PermissionID.PERMISSION_DROP,
        ],
        components: [
            {
                name: 'Users',
                type: 'link',
                url: '/admin/users',
                icon: 'fas fa-user',
                [LayoutKey.REQUIRED_LOGGED_IN]: true,
                [LayoutKey.REQUIRED_PERMISSIONS]: [
                    PermissionID.USER_ADD,
                    PermissionID.USER_EDIT,
                    PermissionID.USER_DROP,
                ],
            },
            {
                name: 'Roles',
                type: 'link',
                url: '/admin/roles',
                icon: 'fas fa-users',
                [LayoutKey.REQUIRED_LOGGED_IN]: true,
                [LayoutKey.REQUIRED_PERMISSIONS]: [
                    PermissionID.ROLE_ADD,
                    PermissionID.ROLE_EDIT,
                    PermissionID.ROLE_DROP,

                    PermissionID.ROLE_PERMISSION_ADD,
                    PermissionID.ROLE_PERMISSION_DROP,
                ],
            },
        ],
    },
    {
        name: 'General',
        type: 'link',
        icon: 'fas fa-globe',
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        [LayoutKey.REQUIRED_PERMISSIONS]: [],
        components: [],
    },
    {
        name: 'Services',
        type: 'link',
        url: '/services',
        icon: 'fa-solid fa-server',
        [LayoutKey.REQUIRED_LOGGED_IN]: true,
        components: [
            {
                name: 'Airflow',
                type: 'link',
                url: '/services/airflow',
                icon: 'fas fa-wind',
            },
            {
                name: 'Minio',
                type: 'link',
                url: '/services/minio',
                icon: 'fas fa-database',
            },

        ],
    },
];
