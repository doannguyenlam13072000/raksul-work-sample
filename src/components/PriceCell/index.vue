<script setup lang="ts">
import type { PriceItem } from '@/types';
import { formatNumber } from '@/utils/formatNumber';

defineProps<{
    cell: PriceItem
    isHovered?: boolean
    isRowHovered?: boolean
    isColumnHovered?: boolean
    isSelected?: boolean
}>();

const emit = defineEmits<{
    click: [item: PriceItem],
    enter: [item: PriceItem],
    leave: [],
}>()

</script>

<template>
    <td 
        class="cell" 
        :class="{
            'is-row-hovered': isRowHovered,
            'is-col-hovered': isColumnHovered,
            'is-selected': isSelected,
        }"
        @click="emit('click', cell)"
        @mouseenter="emit('enter', cell)"
        @mouseleave="emit('leave')"
    >
        <button type="button">
            ¥{{ formatNumber(cell.price) }}
        </button>
    </td>
</template>

<style scoped lang="css">
.cell {
    &:hover {
        background: var(--primary-color) !important;
    }
    
    &.is-selected {
        background: var(--secondary-color) !important;
    }
    
    &.is-row-hovered,
    &.is-col-hovered {
        background:#c8f8f0;
        ;
    }
}

button {
    background: none;
    border: none;
    cursor: pointer;
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 1rem 2rem;
}
</style>