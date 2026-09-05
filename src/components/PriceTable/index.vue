<script setup lang="ts">
import type { PriceResponse } from '../../types';
import SkeletonPriceTable from '../SkeletonPriceTable/index.vue'

defineProps<{
    data: PriceResponse | null
    isLoading: boolean
    isError?: boolean
    errorMsg?: string
}>();
</script>
<template>
    <div>
        <!-- Loading -->
        <div v-if="isLoading">
            <skeleton-price-table />
        </div>

        <!-- Error -->
        <div v-if="isError && errorMsg">
            Error message {{ errorMsg }}
        </div>

        <!-- Data -->
        <div v-if="!isLoading && !!data">
            <pre>{{ data.paper_size }}</pre>
        </div>
    </div>
</template>