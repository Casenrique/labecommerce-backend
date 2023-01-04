console.log("Teste")

import { users, products, purchases } from "./database"
import { CATEGORIES } from "./types";
import { createUser, getAllUsers, createProduct, getAllProducts, getProductById, createPurchase, getAllPurchasesFromUserId } from "./database"


// console.table(users)
// console.log(users)
// console.table(products)
// console.log(products)
// console.log(purchases)
// console.table(purchases)
createUser("u003", "beltrano@email.com", "beltrano99")
getAllUsers()
createProduct("p003", "Picanha", 60, CATEGORIES.MEAT)
getAllProducts()
console.log(getProductById("p001"))
createPurchase("u003", "p003", 3, 180)
console.log(getAllPurchasesFromUserId("u003"))