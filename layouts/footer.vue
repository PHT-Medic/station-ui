<!--
  Copyright (c) 2021-2021.
  Author Peter Placzek (tada5hi)
  For the full copyright and license information,
  view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
export default {
    data() {
        return {
            startYear: 2021,
        };
    },
    computed: {
        year() {
            const year = new Date().getFullYear();

            return year === this.startYear ? year : `${this.startYear}-${year}`;
        },
    },
};
</script>
<template>
    <div class="page-footer">
        <div class="copyright">
            &copy; PHT Medic {{ year }}
        </div>
    </div>
</template>
