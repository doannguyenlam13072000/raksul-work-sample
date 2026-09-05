<script setup lang="ts">
export interface Option {
    value: string,
    label: string
}

defineProps<{
    options: Option[]
}>()

// Binding 2 ways
const selectedValue = defineModel<string>({ required: true })
</script>

<template>
    <section>
        <label for="option-select">Choose an option:</label>
        <select id="option-select" v-model="selectedValue">
            <option value="" disabled>Select option...</option>
            <option v-for="item in options" :key="item.value" :value="item.value">
                {{ item.label }}
            </option>
        </select>
    </section>
</template>