import express, { Request, Response} from 'express'
import cors from 'cors'
import { users, products, purchases } from "./database"
import { CATEGORIES, TProduct, TPurchase, TUser } from "./types";
import { createUser, getAllUsers, createProduct, getAllProducts, getProductById, createPurchase, getAllPurchasesFromUserId } from "./database"
import { resourceLimits } from 'worker_threads';


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

//Exercício 1

app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
        // res.status(200).send(getAllUsers())
    } catch (error: any) {
        res.status(404)
        res.send(error.message)
    }
})

app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
        // res.status(200).send(getAllProducts())
    } catch (error: any) {
        res.status(404)
        res.send(error.message)
    }
})

app.get('/products/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string
        const result: TProduct[] = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
        })

        if(q.length <= 2){
            res.status(400)
            throw new Error("Nome de produto inválido. Nome deve contar no mínimo 2 caracteres")
        }

        if(result.length < 1){
            res.status(400)
            throw new Error("Produto não encontrado")
        }

        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})

app.post('/users', (req: Request, res: Response) => {
    try {
        const { id, email, password } = req.body

        if(typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser do tipo string.")
        }

        if(typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser do tipo string.")
        }

        if(typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser do tipo string.")
        }

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

        const newUser = {
            id,
            email, 
            password
        }
        users.push(newUser)
    
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
    
})

app.post('/products', (req: Request, res: Response) => {
    try {
        const { id, name, price, category } = req.body

        if(!id){
            res.status(404)
            throw new Error("'id' deve ser ser informado.")
        }
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
            category
        }
        products.push(newProduct)
    
        res.status(201).send("Produto cadastrado com sucesso")
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})

app.post('/purchase', (req: Request, res: Response) => {

    try {
        const { userId, productId, quantity, totalPrice } = req.body

        if(!userId){
            res.status(404)
            throw new Error("'userId' deve ser ser informado.")
        }
        if(typeof userId !== "string") {
            res.status(400)
            throw new Error("'userId' deve ser do tipo string.")
        }
        if(!productId){
            res.status(404)
            throw new Error("'productId' deve ser ser informado.")
        }
        if(typeof productId !== "string") {
            res.status(400)
            throw new Error("'productId' deve ser do tipo string.")
        }
        if(!quantity){
            res.status(404)
            throw new Error("'quantity' deve ser ser informado.")
        }
        if(typeof quantity !== "number") {
            res.status(400)
            throw new Error("'quantity' deve ser do tipo number.")
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
            userId,
            productId,
            quantity,
            totalPrice
        }
        purchases.push(newPurchase)
    
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
        const { id } = req.params
    
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