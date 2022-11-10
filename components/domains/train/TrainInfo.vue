<script lang="ts">
import Vue, { PropType } from 'vue';
import { Train } from '../../../domains/train';

export default Vue.extend({
    name: 'TrainInfo',
    props: {
        entity: {
            type: Object as PropType<Train>,
            default: undefined,
        },
    },
    computed: {
        proposalID() {
            if (!this.entity.proposal) {
                return undefined;
            }
            return this.entity.proposal.substring(
                this.entity.proposal.lastIndexOf('/') + 1,
            );
        },
    },
});
</script>

<template>
    <div class="container">
        <h6><i class="fa fa-circle-info" /> General Info </h6>
        <div>
            <div class="font-weight-bold">
                Proposal:
            </div>
            <a
                :href="entity.proposal"
                target="_blank"
            >
                {{ proposalID }} <i class="fa fa-arrow-up-right-from-square" />
            </a>
        </div>
        <div>
            <div class="font-weight-bold">
                Run status:
            </div>
            <div>
                {{ entity.state.status }}
            </div>
        </div>
        <div>
            <div class="font-weight-bold">
                Distribution status:
            </div>
            <div>
                {{ entity.state.central_status }}
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
