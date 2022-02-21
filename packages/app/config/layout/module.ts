/*
 * Copyright (c) 2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    Component,
    ComponentsActive,
    ProviderInterface,
    applyRestrictionForComponents,
} from '@vue-layout/navigation';
import { Context } from '@nuxt/types';
import { LayoutSideAdminNavigation, LayoutSideDefaultNavigation, LayoutTopNavigation } from './index';
import { LayoutKey } from './contants';

export class NavigationProvider implements ProviderInterface {
    protected ctx: Context;

    // -------------------------

    protected primaryItems : Component[] = LayoutTopNavigation;

    protected secondaryDefaultItems : Component[] = LayoutSideDefaultNavigation;

    protected secondaryAdminItems : Component[] = LayoutSideAdminNavigation;

    // -------------------------

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    // ---------------------------

    async getComponents(tier: number, context: ComponentsActive): Promise<Component[]> {
        if (!await this.hasTier(tier)) {
            return [];
        }

        let items : Component[] = [];

        switch (tier) {
            case 0:
                items = this.primaryItems;
                break;
            case 1: {
                const component : Component = context[0] || { id: 'default' };

                switch (component.id) {
                    case 'default':
                        items = this.secondaryDefaultItems;
                        break;
                    case 'admin':
                        items = this.secondaryAdminItems;
                        break;
                }

                break;
            }
        }

        return applyRestrictionForComponents(items, {
            module: this.ctx.$auth,
            layoutKey: {
                requiredAbilities: LayoutKey.REQUIRED_ABILITIES,
                requiredPermissions: LayoutKey.REQUIRED_PERMISSIONS,
                requiredLoggedIn: LayoutKey.REQUIRED_LOGGED_IN,
                requiredLoggedOut: LayoutKey.REQUIRED_LOGGED_OUT,
            },
        });
    }

    async hasTier(tier: number): Promise<boolean> {
        return [0, 1].indexOf(tier) !== -1;
    }

    async getComponentsActive(url: string): Promise<ComponentsActive | undefined> {
        const sortFunc = (a: Component, b: Component) => (b.url?.length ?? 0) - (a.url?.length ?? 0);
        const filterFunc = (item: Component) => !!item.url && (url.startsWith(item.url) || url === item.url);

        // ------------------------

        const secondaryDefaultItems = this.flattenNestedComponents(this.secondaryDefaultItems)
            .sort(sortFunc)
            .filter(filterFunc);
        const secondaryAdminItems = this.flattenNestedComponents(this.secondaryAdminItems)
            .sort(sortFunc)
            .filter(filterFunc);

        if (
            secondaryDefaultItems.length === 0 &&
            secondaryAdminItems.length === 0
        ) {
            return {};
        }

        const isAdminItem = secondaryAdminItems.length > 0;
        const secondaryItem : Component = isAdminItem ? secondaryAdminItems[0] : secondaryDefaultItems[0];

        const primaryItem = this.primaryItems.filter((item) => !!item?.id && item.id === (isAdminItem ? 'admin' : 'default')).pop();

        if (typeof primaryItem === 'undefined') {
            return {};
        }

        return {
            0: primaryItem,
            1: secondaryItem,
        };
    }

    // ----------------------------------------------------

    private flattenNestedComponents(components: Component[]) : Component[] {
        const output = [...components];

        for (let i = 0; i < components.length; i++) {
            if (components[i].components) {
                output.push(...this.flattenNestedComponents(components[i].components));
            }
        }

        return output;
    }
}
