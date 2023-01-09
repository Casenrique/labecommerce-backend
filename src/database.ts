import { TUser, TProduct, TPurchase, CATEGORIES } from "./types";

export const users:TUser[] = [
    {
        id: "u001",
        email: "carlimhenrique@yahoo.com.br",
        password: "carlos123"
    },
    {
        id: "u002",
        email: "henrique@yahoo.com.br",
        password: "henrique123"
    }
]

export const products:TProduct[] = [
    {
        id: "p001",
        name: "Bala",
        price: 0.50,
        category: CATEGORIES.CANDIES
    },
    {
        id: "p002",
        name: "Maça",
        price: 10.50,
        category: CATEGORIES.FRUITS
    }
]

export const purchases:TPurchase[] = [
    {
        userId: 'u001',
        productId: 'p001',
        quantity:  10,
        totalPrice: 5.00
    },
    {
        userId: 'u002',
        productId: 'p002',
        quantity:  1,
        totalPrice: 10.50
    }
]

export function createUser(id: string, email: string, password: string ): void {
    const newUser: TUser = {
        id,
        email,
        password
    }
    users.push(newUser)
    console.log (users)
    console.log ("Cadastro realizado com sucesso")
}

export function getAllUsers(): TUser[] {
    return users
}

export function createProduct(id: string, name: string, price: number, category: CATEGORIES): void {
    const newProduct: TProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    console.log (products)
    console.log ("Produto criado com sucesso")
}

export function getAllProducts(): TProduct[] {
    return products
}

export function getProductById(idToSearch: string): TProduct[] | undefined {
 return(
    products.filter((product) => 
    product.id === idToSearch
 ))
}

export function queryProductsByName(q: string): void {
    const query = products.filter((product) => {
        product.name.toLowerCase().includes(q.toLowerCase())
    })
    console.table(query)
}

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): void {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    console.table(newPurchase)
    purchases.push(newPurchase)
    console.log("Compra realizada com sucesso")
}

export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase[] | undefined {
    return(purchases.filter((purchase) => 
        purchase.userId === userIdToSearch
    ))
}