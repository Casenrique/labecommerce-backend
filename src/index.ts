import express, { Request, Response} from 'express'
import cors from 'cors'
import { users, products, purchases } from "./database"
import { CATEGORIES, TProduct, TPurchase, TUser } from "./types";
import { createUser, getAllUsers, createProduct, getAllProducts, getProductById, createPurchase, getAllPurchasesFromUserId } from "./database"


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

//Exercício 1

const app = express()

app.use(express.json())

app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//Exercício 2

app.get('/users', (req: Request, res: Response) => {
    // res.status(200).send(users)
    res.status(200).send(getAllUsers())
})

app.get('/products', (req: Request, res: Response) => {
    // res.status(200).send(products)
    res.status(200).send(getAllProducts())
})

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result: TProduct[] = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

//Exercício 3

app.post('/users', (req: Request, res: Response) => {
    const { id, email, password } = req.body as TUser

    const newUser = {
        id,
        email, 
        password
    }
    users.push(newUser)

    res.status(201).send("Cadastro realizado com sucesso")
})

app.post('/products', (req: Request, res: Response) => {
    const { id, name, price, category } = req.body as TProduct

    const newProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)

    res.status(201).send("Produto cadastrado com sucesso")
})

app.post('/purchase', (req: Request, res: Response) => {
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase

    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchases.push(newPurchase)

    res.status(201).send("Compra realizada com sucesso")
})

// Exercício 1

//Get Products by id

app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id as string
    const result = products.find((product) => {
        return product.id === id
    })
    res.status(200).send(result)
    console.log("objeto product encontrado")
})

//Get User Purchases by User id

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id as string

    const result = purchases.filter((purchase) => {
        return purchase.userId === id
    })
    res.status(200).send(result)
    console.log("array de compras do user procurado")
})

// Exercício 2

//Delete User by id

app.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id as string

    const userIndex = users.findIndex((user) => {
        return user.id === id
    })

    if (userIndex >= 0) {
        users.splice(userIndex, 1)
    }
    res.status(200).send("Usuário deletado com sucesso")
    console.log("Usuário deletado com sucesso")
})

//Delete Product by id

app.delete('/products/:id', (req: Request, res: Response) => {
    const { id } = req.params

    const productIndex = products.findIndex((product) => {
        return product.id === id
    })

    if (productIndex >= 0) {
        products.splice(productIndex, 1)
    }
    res.status(200).send("Produto deletado com sucesso")
    console.log("Produto deletado com sucesso")
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