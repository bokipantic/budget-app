interface Summary {
    total_pages: number,
    total_items: number,
    page: number,
    per_page: number,
    next: string,
    previous: string,
    balance: number
}

export interface Transaction {
    id: string,
    category: string,
    icon_png: string,
    icon_svg: string,
    created: string,
    amount: number,
    description: string
}

export interface AllTransactions {
    summary: Summary,
    transactions: Transaction[]
}

export interface Category {
    description: string,
    icon: string,
    icon_png: string,
    icon_svg: string,
    id: string,
    name: string
}

export interface NewTransaction {
    amount: string,
    category: string,
    currency: string,
    description: string
}

export interface AddTransaction {
    id: string
}