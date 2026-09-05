<script setup lang="ts">
import TwoColumnFooterLayout from '../layouts/TwoColumnFooterLayout.vue';
import PaperSizeSelector from '../components/PaperSizeSelector/index.vue';
import PriceTable from '../components/PriceTable/index.vue';
import OrderSummary from '../components/OrderSummary/index.vue';
import { usePriceTable } from '../composables/usePriceTable.ts';

const {
    selectedPrice,
    hoveredCell,
    showAll,
    selectedSize,
    paperSizes,

    data,
    isLoading,
    isError,
    errorMsg,

    total,
    hasMoreRow,
    listPrices,

    fetchPrices,

    handleSelectPrice,
    handleMouseLeave,
    handleMouseEnter,

    isCellHovered,
    isRowHovered,
    isColHovered,

} = usePriceTable();
</script>

<template>
    <TwoColumnFooterLayout>
        <template #left>
            <paper-size-selector v-model="selectedSize" :options="paperSizes" />
        </template>
        <template #right>
            <price-table :data="data" :is-loading="isLoading" />
        </template>
        <template #footer>
            <order-summary :total="total" />
        </template>
    </TwoColumnFooterLayout>
</template>