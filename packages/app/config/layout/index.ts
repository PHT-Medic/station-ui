/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { Component } from '@vue-layout/navigation';
import { LayoutKey, LayoutNavigationID } from './contants';
import { PermissionID } from '../../domains/auth/permission';

export const LayoutTopNavigation : Component[] = [
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

export const LayoutSideDefaultNavigation : Component[] = [
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
                icon: 'fa fa-umbrella',
            },
            {
                name: 'Local',
                type: 'link',
                icon: 'fab fa-pagelines',
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

export const LayoutSideAdminNavigation : Component[] = [
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
            {
                name: 'Permissions',
                type: 'link',
                url: '/admin/permissions',
                icon: 'fas fa-key',
                [LayoutKey.REQUIRED_LOGGED_IN]: true,
                [LayoutKey.REQUIRED_PERMISSIONS]: [
                    PermissionID.PERMISSION_ADD,
                    PermissionID.PERMISSION_EDIT,
                    PermissionID.PERMISSION_DROP,
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
        components: [
        ],
    },
];
