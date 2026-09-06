<script setup lang="ts">
import TwoColumnFooterLayout from '../layouts/TwoColumnFooterLayout.vue';
import PaperSizeSelector from '../components/PaperSizeSelector/index.vue';
import PriceTable from '../components/PriceTable/index.vue';
import OrderSummary from '../components/OrderSummary/index.vue';
import SeeMoreButton from '../components/SeeMoreButton/index.vue';
import { usePriceTable } from '../composables/usePriceTable.ts';

const {
    selectedPrice,
    hoveredCell,
    showMore,
    selectedSize,
    paperSizes,
    isLoading,
    isError,
    errorMsg,

    hasMoreRow,
    listPrices,

    handleApply,
    handleSelectPrice,
    handleMouseLeave,
    handleMouseEnter,
    handleToggleShowMore,
    handleCheckout

} = usePriceTable();
</script>

<template>
    <TwoColumnFooterLayout>
        <template #left>
            <paper-size-selector 
                :is-loading="isLoading"
                v-model="selectedSize" 
                @apply="handleApply" 
                :options="paperSizes" 
            />
        </template>

        <template #right>
            <price-table 
                :prices="listPrices"
                :is-error="isError"
                :error-msg="errorMsg"
                :is-loading="isLoading"
                :selected-price="selectedPrice"
                :hovered-cell="hoveredCell"
                @click="handleSelectPrice"
                @enter="handleMouseEnter"
                @leave="handleMouseLeave"
            />
            <div v-if="hasMoreRow && !isLoading">
                <see-more-button 
                    :show-more="showMore"
                    @toggle="handleToggleShowMore"
                />
            </div>
        </template>

        <template #footer>
            <order-summary 
                :selected-price="selectedPrice"
                :is-loading="isLoading"
                @checkout="handleCheckout"
            />
        </template>
    </TwoColumnFooterLayout>
</template>