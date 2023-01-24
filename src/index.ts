import express, { Request, Response} from 'express'
import cors from 'cors'
import { users, products, purchases } from "./database"
import { CATEGORIES, TProduct, TPurchase, TUser } from "./types";
import { createUser, getAllUsers, createProduct, getAllProducts, getProductById, createPurchase, getAllPurchasesFromUserId } from "./database"
import { db } from './database/knex';

// console.table(users)
// console.log(users)
// console.table(products)
// console.log(products)
// console.log(purchases)
// console.table(purchases)
// createUser("u003", "beltrano@email.com", "beltrano99")
// console.table(getAllUsers())
// createProduct("p003", "Picanha", 60, CATEGORIES.MEAT)
// console.table(getAllProducts())
// console.log(getProductById("p001"))
// createPurchase("u003", "p003", 3, 180)
// console.log(getAllPurchasesFromUserId("u003"))


const app = express()

app.use(express.json())

app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//Exercício 1 - Introdução Knex

app.get('/users', async (req: Request, res: Response) => {
    try {
        // const result = await db.raw(`
        //     SELECT * FROM users;
        // `)

        const result = await db("users")

        res.status(200).send(result)
        // res.status(200).send(getAllUsers())
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get('/products', async (req: Request, res: Response) => {
    try {
        // const result = await db.raw(`
        //     SELECT * FROM products;
        // `)

        const result = await db("products")

        res.status(200).send(result)
        // res.status(200).send(getAllProducts())
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get('/products/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q
        // const result: TProduct[] = await db.raw(`
        //     SELECT * FROM products
        //     WHERE name LIKE "%${q}%";
        // `)

        const result = await db("products").where("name", "LIKE", `%${q}%`)

        // const result: TProduct[] = products.filter((product) => {
        //     return product.name.toLowerCase().includes(q.toLowerCase())
        // })

        if(result.length < 1){
            res.status(400)
            throw new Error("Produto não encontrado")
        }
        
        if(typeof q !=="string"){
            res.status(400)
            throw new Error("id deve ser um texto")
            }

        if(q.length <= 2){
            res.status(400)
            throw new Error("Nome de produto inválido. Nome deve contar no mínimo 2 caracteres")
        }        

        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Exercício 2 - Introdução Knex

app.post('/users', async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body

        if(!id || !name || !email || !password) {
            res.status(400)
            throw new Error("Dados inválidos")            
        }

        if(typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser do tipo string.")
        }

        if(typeof name !== "string") {
            res.status(400)
            throw new Error("'id' deve ser do tipo name.")
        }

        if(typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser do tipo string.")
        }

        if(typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser do tipo string.")
        }

        //  await db.raw(`
        //  INSERT INTO users (id, name, email, password)
        //  VALUES ("${id}", "${name}", "${email}", "${password}")
        //  `)
        
        const userId = users.find((user) => user.id === id)
        
        if(userId) {
            res.status(409)
            throw new Error("'id' já cadastrado.")
        }
        
        const userEmail = users.find((user) => user.email === email)
        
        if(userEmail) {
            res.status(409)
            throw new Error("'email' já cadastrado.")
        }
        
        // const newUser = {
        //     id,
        //     email, 
        //     password
        // }
        // users.push(newUser)
        
        await db.insert({ id, name, email, password }).into("users")
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
}
})

app.post('/products', async (req: Request, res: Response) => {
    try {
        const { id, name, price, category, description, image_url } = req.body

        if(!id || !name || !price || !category || !description || !image_url){
            res.status(404)
            throw new Error("Dados inválidos.")
        }

        // await db.raw(`
        //  INSERT INTO products (id, name, price, category, description, image_url)
        //  VALUES ("${id}", "${name}", "${price}", "${category}", "${description}", "${image_url}" )
        // `)

        if(typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser do tipo string.")
        }

        if(!name){
            res.status(404)
            throw new Error("'name' deve ser ser informado.")
        }        
        
        if(typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser do tipo string.")
        }       

        if(!price){
            res.status(404)
            throw new Error("'price' deve ser ser informado.")
        }

        if(typeof price !== "number") {
            res.status(400)
            throw new Error("'price' deve ser do tipo string.")
        }

        if(!category){
            res.status(404)
            throw new Error("'category' deve ser ser informado.")
        }
        
        if(typeof category !== "string") {
            res.status(400)
            throw new Error("'category' deve ser do tipo string.")
        }

        const productId = products.find((product) => product.id === id)

        if(productId) {
            res.status(409)
            throw new Error("'id' já cadastrado.")
        }

        const newProduct: any = {
            id,
            name,
            price,
            category,
            description, 
            image_url
        }

        await db.insert(newProduct).into("products")
    
        res.status(201).send("Produto cadastrado com sucesso")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post('/purchases', async (req: Request, res: Response) => {

    try {
        const { purchaseId, buyerId, totalPrice } = req.body

        if(!purchaseId){
            res.status(404)
            throw new Error("'userId' deve ser ser informado.")
        }
        if(typeof purchaseId !== "string") {
            res.status(400)
            throw new Error("'purchaseId' deve ser do tipo string.")
        }
        if(!buyerId){
            res.status(404)
            throw new Error("'buyerId' deve ser ser informado.")
        }
        if(typeof buyerId !== "string") {
            res.status(400)
            throw new Error("'buyerId' deve ser do tipo string.")
        }
        if(!totalPrice){
            res.status(404)
            throw new Error("'totalPrice' deve ser ser informado.")
        }
        if(typeof totalPrice !== "number") {
            res.status(400)
            throw new Error("'totalPrice' deve ser do tipo number.")
        }
        

        // const purchaseUserId = users.find((user) => user.id === userId)
        // if(!users.includes(purchaseUserId)){
            
        // }

        const newPurchase = {
            id: purchaseId,
            total_price: totalPrice,
            buyer_id: buyerId
        }

        await db.insert(newPurchase).into("purchases")
    
        res.status(201).send("Compra realizada com sucesso")

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})


//Get Products by id

app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const result = products.find((product) => {
            return product.id === id
        })

        if(!result) {
            throw new Error("Produto não existe.")
        }
        res.status(200).send(result)
        console.log("Produto encontrado")

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }    
})

//Get User Purchases by User id

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        const  id  = req.params.id
    
        const result = purchases.filter((purchase) => {
            return purchase.userId === id
        })

        if(!result) {
            res.status(404)
            throw new Error("Compra não existe.")
        }
        res.status(200).send(result)
        console.log("array de compras do user procurado")

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})

// Exercício 2

//Delete User by id

app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params    
        const userIndex = users.findIndex((user) => {
            return user.id === id
        })
    
        if (userIndex >= 0) {
            users.splice(userIndex, 1)
            res.status(200).send("Usuário deletado com sucesso")
            console.log("Usuário deletado com sucesso")
        } else {
            res.status(404)
            throw new Error("Usuário não encontrado")
        }
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})

//Delete Product by id

app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params
    
        const productIndex = products.findIndex((product) => {
            return product.id === id
        })
    
        if (productIndex >= 0) {
            products.splice(productIndex, 1)
        }
        res.status(200).send("Produto deletado com sucesso")
        console.log("Produto deletado com sucesso")

        
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})

// Exercício 3

//Edit User by id

app.put('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const user = users.find((user) => user.id === id)

    if(user) {
        user.id = newId || user.id
        user.email = newEmail || user.email
        user.password = newPassword || user.password
    }

    res.status(200).send("Atualização realizada com sucesso")
})

//Edit Product by id

app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id as string

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number
    const newCategory = req.body.category as CATEGORIES | undefined

    const product = products.find((product) => product.id === id)

    if(product) {
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = isNaN(newPrice) ? product.price : newPrice
        product.category = newCategory || product.category
    }

    res.status(200).send("Atualização realizada com sucesso")
})

// Exercício 2 - Aprofundamento Knex

app.get("/purchase/:id"),async (req: Request, res: Response ) => {
    
}