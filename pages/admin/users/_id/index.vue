<!--
  Copyright (c) 2021-2021.
  Author Peter Placzek (tada5hi)
  For the full copyright and license information,
  view the LICENSE file that was distributed with this source code.
  -->
<script>
export default {
    props: {
        entity: {
            type: Object,
            default: undefined,
        },
    },
    methods: {
        handleSelected(e) {
            this.$emit('updated', e);
        },
    },
};
</script>
<template>
    <div>
        <div class="row">
            <div class="col-7">
                <h6>General</h6>
                <user-form
                    :entity="entity"
                    :realm-id="entity.realm_id"
                    @updated="handleUpdated"
                />
            </div>
            <div class="col-5">
                <h6>Password</h6>
                <user-password-form
                    :id="entity.id"
                    @updated="handleUpdated"
                />
            </div>
        </div>
    </div>
</template>
