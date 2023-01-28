export enum CATEGORIES {
    FRUITS = "Frutas",
    CANDIES = "Doces",
    MEAT = "Carne Bovina"
}

export type TUser = {
    id: string,
    email: string,
    password: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number | undefined,
    category: CATEGORIES,
    description: string,
    image_url: string
}

export type TPurchase = {
    id: string,
    total_price: number,
    paid: number,
    delivered_at: string,
    buyer_id: string,
    created_at: string
}

export type TPurchaseProduct = {
    purchase_id: string,
    product_id: string,
    quantity: number
}