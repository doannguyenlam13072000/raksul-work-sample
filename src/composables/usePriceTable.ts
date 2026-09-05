import { computed, onMounted, ref, watch } from "vue"
import type { PriceResponse, HoveredCell, SelectedPrice, PriceItem } from "../types";
import { getPaperPrices } from "../apis";

const MAX_ROW = 5;

export const usePriceTable = () => {

    const hoveredCell = ref<HoveredCell | null>(null)
    const showAll = ref<boolean>(false);
    const selectedPrice = ref<SelectedPrice | null>(null)
    const selectedSize = ref<string>('A4');
    const paperSizes = [
        {
            value: 'A4',
            label: 'A4',
        },
        {
            value: 'A5',
            label: 'A5',
        },
        {
            value: 'B4',
            label: 'B4',
        },
        {
            value: 'B5',
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

        if (!showAll.value) {
            return data.value.prices.slice(0, MAX_ROW);
        }

        return data.value.prices;
    })

    const total = computed(() => {
        if (!selectedPrice.value) return 0;

        return selectedPrice.value.price * selectedPrice.value.business_day;
    })

    // DOM events
    const handleSelectPrice = (cell: SelectedPrice) => {
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


    // For class effect
    const isCellHovered = (currentCell: PriceItem) => {
        if (!hoveredCell.value) return false

        return hoveredCell.value.quantity === currentCell.quantity
            && hoveredCell.value.business_day === currentCell.business_day
    }

    const isRowHovered = (row: PriceItem[]) => {
        if (!hoveredCell.value) return false

        return hoveredCell.value.quantity === row[0].quantity
    };

    const isColHovered = (currentCell: PriceItem) => {
        if (!hoveredCell.value) return false;

        return hoveredCell.value.business_day === currentCell.business_day;
    };

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

    watch(selectedSize, async (newVal) => {

        fetchPrices(newVal);
    })

    onMounted(() => {
        fetchPrices(selectedSize.value)
    })

    return {
        selectedPrice,
        hoveredCell,
        showAll,
        selectedSize,
        paperSizes,

        data,
        isLoading,
        isError,
        errorMsg,

        hasMoreRow,
        listPrices,
        total,

        fetchPrices,

        handleSelectPrice,
        handleMouseLeave,
        handleMouseEnter,

        isCellHovered,
        isRowHovered,
        isColHovered,
    }
}