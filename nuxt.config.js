/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

const config = {
    publicRuntimeConfig() {
        return {
            resourceApiUrl: process.env.RESOURCE_API_URL,
            authApiUrl: process.env.AUTH_API_URL,
            centralApiUrl: process.env.REALTIME_URL ||
                'https://pht-medic.medizin.uni-tuebingen.de.de/',
        };
    },
    env: {
        resourceApiUrl: process.env.RESOURCE_API_URL,
        authApiUrl: process.env.AUTH_API_URL,
        centralApiUrl: process.env.REALTIME_URL ||
            'https://pht-medic.medizin.uni-tuebingen.de.de/',
    },
    telemetry: false,
    ssr: true,
    /*
    ** Headers of the page
    */
    head: {
        title: 'PHT - User Interface (UI)',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/fav.png' },
        ],
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
        'vue-form-wizard/dist/vue-form-wizard.min.css',
        '@fortawesome/fontawesome-free/css/all.css',
        'bootstrap/dist/css/bootstrap.min.css',
        'bootstrap-vue/dist/bootstrap-vue.css'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [

    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/google-fonts',
    ],
    googleFonts: {
        families: {
            Asap: true,
            Nunito: true,
        },
    },
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://bootstrap-vue.js.org
        'bootstrap-vue/nuxt',
        // Doc: https://github.com/nuxt-community/dotenv-module
        '@nuxtjs/dotenv',
    ],

    router: {
        // base: '/',
        middleware: [],
    },

    build: {
        extend(config) {
            if (!config.resolve) {
                config.resolve = {};
            }

            if (!config.resolve.alias) {
                config.resolve.alias = {};
            }

            if (!config.resolve.plugins) {
                config.resolve.plugins = [];
            }

            if (Object.prototype.hasOwnProperty.call(config.resolve.alias, '~')) {
                delete config.resolve.alias['~'];
            }

            if (Object.prototype.hasOwnProperty.call(config.resolve.alias, '@')) {
                delete config.resolve.alias['@'];
            }
        },
    },
};

module.exports = config;
