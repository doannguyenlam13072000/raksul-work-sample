<script setup lang="ts">
export interface Option {
    value: string,
    label: string
}

defineProps<{
    options: Option[]
    isLoading: boolean
}>()

const emit = defineEmits<{
    apply: [paperSize: string]
}>()


const handleApply = () => {
    emit('apply', selectedValue.value);
}

// Binding 2 ways
const selectedValue = defineModel<string>({ required: true })
</script>

<template>
    <section class="selector-wrapper">
        <div class="selector">
            <label for="option-select">Choose a paper size:</label>
            <select id="option-select" v-model="selectedValue">
                <option value="" disabled>Select option...</option>
                <option v-for="item in options" :key="item.value" :value="item.value">
                    {{ item.label }}
                </option>
            </select>
        </div>

        <div class="apply-btn">
            <button 
                :disabled="isLoading"
                class="btn"
                :class="{
                    'disabled': isLoading
                }"
                @click="handleApply"
            >
                Apply
            </button>
        </div>
    </section>
</template>

<style scoped lang="css">
.selector-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 1rem;
}

.selector {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.selector label {
    color: var(--text-color);
    font-weight: 600;
}

.selector select {
    padding: .5rem;
    border: 2px solid var(--border-color);
    border-radius: .25rem;
    font-size: 1rem;
}

.apply-btn {
    align-self: flex-end;
}

.apply-btn .btn {
    border: 2px solid var(--border-color);
    border-radius: .25rem;
    background-color: var(--background-color);
    color: var(--text-color);
    font-weight: 700;
    padding: .75rem 2rem;
    cursor: pointer;
    font-size: 1rem;
}

.apply-btn .btn.disabled {
    pointer-events: none;
    opacity: .8;
    background-color: var(--secondary-background-color);
}

.apply-btn .btn:hover {
    background-color: var(--primary-color);
}
</style>