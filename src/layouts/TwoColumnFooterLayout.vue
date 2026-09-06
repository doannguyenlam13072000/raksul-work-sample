<template>
    <div class="container">
        <div class="left">
            <slot name="left" />
        </div>
        <div class="right">
            <slot name="right" />
        </div>

        <div class="footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<style scoped lang="css">
/* Base Styles: Applies to Desktop & Tablet */
.container {
    display: grid;
    grid-template-areas:
        "left right"
        "footer footer";
    grid-template-columns: 1fr 3fr;
    gap: 2rem;
    width: 100%;
    max-width: 100%;
}

.left, .right, .footer {
    padding: 1rem;
    background-color: var(--secondary-background-color);
    overflow-x: scroll;
    min-width: 0;
}

.left {
    grid-area: left;
}

.right {
    grid-area: right;
}

.footer {
    grid-area: footer;
}

/* Mobile Screens (Under 1023) */
@media screen and (max-width: 1023px) {
    .container {
        /* Change columns to a single 1fr column */
        grid-template-columns: 1fr;

        /* Stack areas vertically in a single column */
        grid-template-areas:
            "left"
            "right"
            "footer";
    }
}
</style>