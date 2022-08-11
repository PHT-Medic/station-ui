<script>
export default {
    name: 'Fhir',
    data() {
        return {
            sidebar: {
                hide: false,
                items: [
                    {
                        name: 'Overview',
                        urlSuffix: '',
                        icon: 'fas fa-bars',
                    },
                    {
                        name: 'Create',
                        urlSuffix: '/add',
                        icon: 'fas fa-plus',
                    },

                ],
            },
        };
    },
};
</script>

<template>
    <div>
        <h1 class="title no-border mb-3">
            🔥 FHIR <span class="sub-title">Manage connected FHIR servers</span>
        </h1>
        <div class="content-wrapper">
            <div class="content-sidebar flex-column">
                <b-nav
                    pills
                    vertical
                >
                    <b-nav-item
                        v-for="(item,key) in sidebar.items"
                        :key="key"
                        :disabled="item.active"
                        :to="'/data/fhir' + item.urlSuffix"
                        exact
                        exact-active-class="active"
                    >
                        <i :class="item.icon" />
                        {{ item.name }}
                    </b-nav-item>
                </b-nav>
            </div>
            <div class="content-container">
                <nuxt-child />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
