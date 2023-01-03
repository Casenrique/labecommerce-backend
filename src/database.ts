import { TUser, TProduct, TPurchase } from "./types";

export const users:TUser[] = [
    {
        id: "Carlos",
        email: "carlimhenrique@yahoo.com.br",
        password: "carlos123"
    },
    {
        id: "Henrique",
        email: "henrique@yahoo.com.br",
        password: "henrique123"
    }
]

export const products:TProduct[] = [
    {
        id: "001",
        name: "Bala",
        price: 0.50,
        category: "Doces"
    },
    {
        id: "002",
        name: "Maça",
        price: 10.50,
        category: "Frutas"
    }
]

export const purchases:TPurchase[] = [
    {
        userId: 'Carlos',
        productId: '001',
        quantity:  10,
        totalPrice: 5.00
    },
    {
        userId: 'Henrique',
        productId: '002',
        quantity:  1,
        totalPrice: 10.50
    }
]