import { computed, onMounted, ref } from "vue"
import type { PriceResponse, HoveredCell, SelectedPrice, PriceItem } from "../types";
import { getPaperPrices } from "../apis/price";

const MAX_ROW = 5;

export const usePriceTable = () => {

    const hoveredCell = ref<HoveredCell | null>(null)
    const showMore = ref<boolean>(false);
    const selectedPrice = ref<SelectedPrice | null>(null)
    const selectedSize = ref<string>('b4');
    const paperSizes = [
        {
            value: 'a4',
            label: 'A4',
        },
        {
            value: 'a5',
            label: 'A5',
        },
        {
            value: 'b4',
            label: 'B4',
        },
        {
            value: 'b5',
            label: 'B5',
        }
    ]

    const data = ref<PriceResponse | null>(null)
    const isLoading = ref<boolean>(false);
    const isError = ref<boolean>(false);
    const errorMsg = ref<string>('');

    const hasMoreRow = computed(() => {
        if (!data.value) return false

        return data.value.prices.length > MAX_ROW;
    })

    const listPrices = computed(() => {
        if (!data.value) return []

        if (!showMore.value) {
            return data.value.prices.slice(0, MAX_ROW);
        }

        return data.value.prices;
    })

    // DOM events
    const handleSelectPrice = (cell: SelectedPrice) => {
        if (selectedPrice.value?.price === cell.price &&
            selectedPrice.value.business_day === cell.business_day) {
            selectedPrice.value = null
            return
        }
        selectedPrice.value = {
            ...cell
        }
    }

    const handleMouseLeave = () => {
        hoveredCell.value = null
    };

    const handleMouseEnter = (cell: PriceItem) => {
        hoveredCell.value = {
            quantity: cell.quantity,
            business_day: cell.business_day
        }
    };

    const handleToggleShowMore = () => {
        showMore.value = !showMore.value
    }

    // Fetch data
    const fetchPrices = async (paperSize: string) => {
        isLoading.value = true;
        isError.value = false;
        errorMsg.value = '';
        data.value = null;

        try {
            const res = await getPaperPrices(paperSize);
            data.value = res
        } catch (error) {
            isError.value = true;
            errorMsg.value = error instanceof Error
                ? error.message
                : 'Something went wrong!';
        } finally {
            isLoading.value = false;
        }
    }

    const handleApply = async () => {
        showMore.value = false
        await fetchPrices(selectedSize.value)
    }

    const handleCheckout = async () => {
        if (!selectedPrice.value) return
        isLoading.value = true
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(null)
            }, 1000);
        })
        alert('Checkout successfully!')

        isLoading.value = false
    }

    onMounted(() => {
        fetchPrices(selectedSize.value)
    })

    return {
        selectedPrice,
        hoveredCell,
        showMore,
        selectedSize,
        paperSizes,

        isLoading,
        isError,
        errorMsg,

        hasMoreRow,
        listPrices,

        handleSelectPrice,
        handleMouseLeave,
        handleMouseEnter,
        handleToggleShowMore,

        fetchPrices,
        handleApply,
        handleCheckout,
    }
}