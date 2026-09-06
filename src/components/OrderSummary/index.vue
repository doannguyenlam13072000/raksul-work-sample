<script setup lang="ts">
import { formatNumber } from '@/utils/formatNumber';



defineProps<{
    total: number
}>();
</script>

<template>
    <div class="flex align-center justify-end gap-4">
        <div class="price">
            <span>Order price:</span>
            <span>¥{{ formatNumber(total) }}</span>
        </div>
        <div class="cart">
            <button class="p-4">Cart</button>
        </div>
    </div>
</template>