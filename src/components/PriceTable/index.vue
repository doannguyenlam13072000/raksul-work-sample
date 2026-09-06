<script setup lang="ts">
import { computed } from 'vue';
import type { HoveredCell, PriceItem, SelectedPrice } from '../../types';
import SkeletonPriceTable from '../SkeletonPriceTable/index.vue'
import PriceCell from '../PriceCell/index.vue'

const props = defineProps<{
    prices: PriceItem[][] | null
    isLoading: boolean
    isError?: boolean
    errorMsg?: string
    selectedPrice: SelectedPrice | null
    hoveredCell?: HoveredCell | null
}>();

const emit = defineEmits<{
    click: [item: PriceItem],
    enter: [item: PriceItem],
    leave: [],
}>()


const businessDays = computed(() => {
    if (!props?.prices) return [];

    return props.prices[0].map(item => (item.business_day))
})

const isSelected = (cell: PriceItem) => {
    if (!props.selectedPrice) return false;

    return props.selectedPrice.business_day === cell.business_day
        && props.selectedPrice.price === cell.price
}

const isHovered = (cell: PriceItem) => {
    if (!props.hoveredCell) return false;

    return props.hoveredCell.business_day === cell.business_day
        && props.hoveredCell.quantity === cell.quantity
}

const isColHovered = (cell: PriceItem) => {
    if (!props.hoveredCell) return false;

    return props.hoveredCell.business_day === cell.business_day;
}

const isRowHovered = (row: PriceItem[]) => {
    if (!props.hoveredCell) return false;

    return props.hoveredCell.quantity === row[0].quantity;
}

</script>

<template>
    <div>
        <h3 v-if="!isLoading" class="heading">Price table</h3>
        <!-- Loading -->
        <div v-if="isLoading">
            <skeleton-price-table />
        </div>

        <!-- Error -->
        <div v-if="isError && errorMsg">
            Error message {{ errorMsg }}
        </div>

        <!-- Data -->
        <div class="table-wrapper" v-if="!isLoading && prices?.length">
            <table>
                <!-- <caption class="sr-only">Delivery price table by quantity and business days</caption> -->
                <thead>
                    <tr>
                        <th>Quantity</th>

                        <th v-for="day in businessDays" :key="day" class="badge">
                            <span>{{ day }} day</span><span v-if="day !== 1">s</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="row in prices" :key="row[0].quantity">
                        <th scope="row">
                            {{ row[0]?.quantity }}
                        </th>


                        <price-cell v-for="cell in row" :cell="cell" :is-hovered="isHovered(cell)"
                            :is-column-hovered="isColHovered(cell)" :is-row-hovered="isRowHovered(row)"
                            :is-selected="isSelected(cell)" @click="emit('click', cell)"
                            @mouseenter="emit('enter', cell)" @mouseleave="emit('leave')" />
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<style scoped lang="css">
.heading {
    color: var(--text-color);
    font-weight: 600;
    line-height: 1.5rem;
}

.table-wrapper {
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: 1rem;

    table {
        border-collapse: collapse;
        border: 0;
        width: 100%;
    }

    thead {
        tr {
            th {
                position: relative;
                padding: .5rem 2rem;
                border: 2px solid var(--border-color);
                border-radius: .25rem;
                background-color: var(--background-color);

                &.badge {
                    &::before {
                        position: absolute;
                        content: '';
                        top: 0;
                        left: 0;
                        border-top: 16px solid var(--primary-color);
                        border-right: 16px solid transparent;
                    }
                }
            }
        }
    }

    tbody {
        td,
        th {
            background: var(--background-color);
            border: 2px solid var(--border-color);
            border-radius: .25rem;
        }
    }
}
</style>