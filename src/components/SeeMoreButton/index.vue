<script setup lang="ts">
defineProps<{
    showMore: boolean
}>();
const emit = defineEmits<{
    toggle: []
}>()

</script>
<template>
    <div class="see-more-wrapper">
        <button type="button" @click="emit('toggle')">
            <span>See {{ showMore ? 'less' : 'more' }}</span>
            <svg v-if="!showMore" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
            </svg>
        </button>
    </div>
</template>

<style scoped lang="css">
.see-more-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 1rem;

}

button {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--text-color);
    width: fit-content;
    padding: .5rem 2rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-weight: bold;
}

button:hover {
    opacity: .7;
}

svg {
    width: 20px;
    height: 20px;
}
</style>