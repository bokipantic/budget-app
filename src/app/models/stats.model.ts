export interface Category {
    id_category: string,
    category_name: string,
    category_icon: string,
    amount: number
}

export interface MonthStats {
    income: number,
    outcome: number,
    by_category: Category[]
}