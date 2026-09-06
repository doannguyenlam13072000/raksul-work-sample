<template>
    <div class="heading skeleton"></div>

    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th class="skeleton" colspan="6"></th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td class="skeleton" colspan="6"></td>
                </tr>
                <tr>
                    <td class="skeleton" colspan="6"></td>
                </tr>
                <tr>
                    <td class="skeleton" colspan="6"></td>
                </tr>
                <tr>
                    <td class="skeleton" colspan="6"></td>
                </tr>
                <tr>
                    <td class="skeleton" colspan="6"></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="see-more-wrapper">
        <button class="skeleton"></button>
    </div>
</template>

<style scoped>
.heading {
    background-color: var(--background-color);
    height: 1.5rem;
    width: 100%;
    border-radius: .25rem;
}

.table-wrapper {
    width: 100%;
    margin-top: 1rem;
}

.table-wrapper table {
    width: 100%;
    border-collapse: collapse;
    border: 0;
}

.table-wrapper table tr th,
.table-wrapper table tr td {
    height: 48px;
    background-color: var(--background-color);
}

.table-wrapper table thead tr th:first-child {
    border-top-left-radius: .5rem;
}

.table-wrapper table thead tr th:last-child {
    border-top-right-radius: .5rem;
}

.table-wrapper table tbody tr:last-child td:first-child {
    border-bottom-left-radius: .5rem;
}

.table-wrapper table tbody tr:last-child td:last-child {
    border-bottom-right-radius: .5rem;
}

.see-more-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

.see-more-wrapper button {
    height: 52px;
    width: 124px;
    display: flex;
    justify-content: center;
    border: none;
    background-color: transparent;
}

.skeleton {
    background: linear-gradient(90deg,
            #e0e1e3 25%,
            #f0f2f6 37%,
            #e0e1e3 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
}

@keyframes skeleton-loading {
    0% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0 50%;
    }
}
</style>