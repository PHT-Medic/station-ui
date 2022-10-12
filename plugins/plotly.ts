import Plotly from 'plotly.js';
import { Context } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';

export default async (ctx: Context, inject: Inject) => {
    inject('plotly', Plotly);
};
