<script setup lang="ts">
import type { SelectedPrice } from '@/types';
import { formatNumber } from '@/utils/formatNumber';
defineProps<{
    selectedPrice?: SelectedPrice | null
    isLoading: boolean
}>();

const emit = defineEmits<{
    checkout: []
}>()
</script>

<template>
    <div class="order-summary">
        <div class="price">
            <span>Order price: </span>
            <span>¥{{ formatNumber(selectedPrice?.price ?? 0) }}</span>
        </div>
        <div class="cart-btn">
            <button 
                type="button" 
                class="btn" 
                :class="{
                    disabled: !selectedPrice || isLoading
                }" 
                :disabled="!selectedPrice || isLoading" 
                @click="emit('checkout')"
            >
                Cart
            </button>
        </div>
    </div>
</template>

<style>
.order-summary {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
}

.price {
    font-weight: 600;
}

.cart-btn .btn {
    border: none;
    background-color: var(--primary-color);
    color: var(--text-color);
    font-weight: 700;
    padding: .75rem 2rem;
    cursor: pointer;
    font-size: 1rem;
}

.cart-btn .btn.disabled {
    opacity: .7;
    pointer-events: none;
}

.cart-btn .btn:hover {
    box-shadow: 0 5px 15px -10px #1f123599;
}
</style>