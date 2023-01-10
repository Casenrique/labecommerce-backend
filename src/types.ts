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
    category: CATEGORIES
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}