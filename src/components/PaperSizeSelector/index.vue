<script setup lang="ts">
export interface Option {
    value: string,
    label: string
}

defineProps<{
    options: Option[]
}>()

const emit = defineEmits<{
    change: [paperSize: string]
}>()


const handleApply = () => {
    emit('change', selectedValue.value);
}

// Binding 2 ways
const selectedValue = defineModel<string>({ required: true })
</script>

<template>
    <section>
        <div>
            <label for="option-select">Choose an option:</label>
            <select id="option-select" v-model="selectedValue">
                <option value="" disabled>Select option...</option>
                <option v-for="item in options" :key="item.value" :value="item.value">
                    {{ item.label }}
                </option>
            </select>
        </div>

        <div>
            <button @click="handleApply">Apply</button>
        </div>
    </section>
</template>