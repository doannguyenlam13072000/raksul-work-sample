export interface PriceItem {
    business_day: number
    price: number
    quantity: number
}

export interface PriceResponse {
    paper_size: string
    prices: PriceItem[][]
}

export interface SelectedPrice {
    quantity: number
    business_day: number
    price: number
}

export interface HoveredCell {
    quantity?: number
    business_day?: number
}