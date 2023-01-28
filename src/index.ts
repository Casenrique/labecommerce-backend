import express, { Request, Response} from 'express'
import cors from 'cors'
import { TProduct, TPurchase, TPurchaseProduct, TUser } from "./types";
import { db } from './database/knex';


const app = express()

app.use(express.json())

app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//Endpoint Get all users com funcionalidade de pesquisa por nome e por id

app.get('/users', async (req: Request, res: Response) => {
    try {
        
        const searchTerm = req.query.q as string | undefined

        if(searchTerm === undefined) {
            const result = await db("users")
            .select(
                "id",
                "name",
                "email",
                "password",
                "created_at AS createdAt",
            )
            res.status(200).send(result)
        } else {
            const result = await db("users")
            .select(
                "id",
                "name",
                "email",
                "password",
                "created_at AS createdAt",
            )
            .where("name", "LIKE", `%${searchTerm}%`)
            .orWhere("id", "LIKE", `%${searchTerm}%`)
            res.status(200).send(result)
        }

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

//Endpoint Get all products com funcionalidade de pesquisa por nome e por id

app.get('/products', async (req: Request, res: Response) => {
    try {
        
        const searchTerm = req.query.q as string | undefined

        if(searchTerm === undefined) {
            const result = await db("products")
            .select(
                "id",
                "name",
                "price",
                "category",
                "description",
                "image_url AS imageUrl"
            )
            res.status(200).send(result)
        } else {
            const result = await db("products")
            .select(
                "id",
                "name",
                "price",
                "category",
                "description",
                "image_url AS imageUrl"
            )
            .where("name", "LIKE", `%${searchTerm}%`)
            .orWhere("description", "LIKE", `%${searchTerm}%`)
            res.status(200).send(result)
        }


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

app.get('/purchases', async (req: Request, res: Response) => {
    try {
        
        const searchTerm = req.query.q as string | undefined

        if(searchTerm === undefined) {
            const result = await db("purchases")
            res.status(200).send(result)
        } else {
            const result = await db("purchases").where("name", "LIKE", `%${searchTerm}%`)
            res.status(200).send(result)
        }

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

//Endpoint Create user

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
           
        const [userIdAlreadyExists]: TUser[] | undefined = await db("users").where({ id })
        
        if(userIdAlreadyExists) {
            res.status(409)
            throw new Error("'id' já cadastrado.")
        }        
        
        const [userEmailAlreadyExists]: TUser[] | undefined = await db("users").where({ email })

        if(userEmailAlreadyExists) {
            res.status(409)
            throw new Error("'email' já cadastrado.")
        }
                       
        await db.insert({ id, name, email, password }).into("users")
        res.status(201).send({message: "Cadastro realizado com sucesso"})

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
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category
        const description = req.body.description
        const imageUrl = req.body.imageUrl

        if(!id || !name || !price || !category || !description || !imageUrl){
            res.status(404)
            throw new Error("Dados inválidos.")
        }
    
        if(typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser do tipo string." )
        }

        if(!name){
            res.status(404)
            throw new Error( "'name' deve ser ser informado.")
        }        
        
        if(typeof name !== "string") {
            res.status(400)
            throw new Error( "'name' deve ser do tipo string.")
        }       

        if(!price){
            res.status(404)
            throw new Error( "'price' deve ser ser informado.")
        }

        if(typeof price !== "number") {
            res.status(400)
            throw new Error( "'price' deve ser do tipo string.")
        }

        if(!category){
            res.status(404)
            throw new Error( "'category' deve ser ser informado.")
        }
        
        if(typeof category !== "string") {
            res.status(400)
            throw new Error("'category' deve ser do tipo string.")
        }

        const [ productIdAlreadyExists ]: TProduct[] | undefined = await db("products").where({ id })

        if(productIdAlreadyExists) {
            res.status(409)
            throw new Error( "'id' do produto já cadastrado.")
        }

        const newProduct: any = {
            id,
            name,
            price,
            category,
            description, 
            image_url: imageUrl
        }

        await db.insert(newProduct).into("products")
    
        res.status(201).send({ message: "Produto cadastrado com sucesso" })
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

        const purchaseId = req.body.purchaseId
        const buyerId = req.body.buyerId
        const productId = req.body.productId
        const quantity = req.body.quantity

        const[ products ] = await db("products").where({ id: productId})

        if(!purchaseId || !buyerId || !productId || !quantity) {
            res.status(404)
            throw new Error("Dados inválidos.")
        }
        
        const [ purchaseIdAlreadyExists ]: TPurchase[] | undefined = await db("purchases").where({ id: purchaseId })

        if(purchaseIdAlreadyExists) {
            res.status(409)
            throw new Error("'id' da compra já cadastrado.")
        }
   
        if(typeof purchaseId !== "string") {
            res.status(400)
            throw new Error("'purchaseId' deve ser do tipo string.")
        }

        if(purchaseId[0] !== "p" && purchaseId[1] !== "u"){
            res.status(400)
            throw new Error("O id deve iniciar com 'pu'.")
        }
        
        const [ userIExists ]: TUser[] | undefined = await db("users").where({ id: buyerId })

        if(!userIExists) {
            res.status(404)
            throw new Error("'id' do user não encontrado")            
        }

        if(typeof buyerId !== "string") {
            res.status(400)
            throw new Error("'buyerId' deve ser do tipo string.")
        }
        
        if(typeof quantity !== "number") {
            res.status(400)
            throw new Error("'quantity' deve ser do tipo number.")
        }
        
        
                
        const newPurchase = {
            id: purchaseId,
            buyer_id: buyerId,
            total_price: products.price * quantity
        }

        await db("purchases").insert(newPurchase)

        const newPurchaseProduct: TPurchaseProduct = {
            purchase_id: purchaseId,
            product_id: productId,
            quantity            
        }

        await db("purchases_products").insert(newPurchaseProduct)

        const purchases: TPurchase[] = await db("purchases")

        const result = []

        for (let purchase of purchases) {
            const cart = []
            const purchases_products: TPurchaseProduct[] = await db("purchases_products")
            .select(
                "id",
                "buyer_id AS buyer",
                "total_price AS totalPrice"
                // "purchases_products.quantity"
            )
            .where({ purchase_id: purchase.id })
            
            for (let purchase_product of purchases_products) {
                const [ product ]: TProduct[] = await db("products")
                .select(
                    "id",
                    "name",
                    "price",
                    "category",
                    "description",
                    "image_url AS imageUrl"
                    // "purchases_products.quantity"
                )
                .where( {id: purchase_product.product_id } )
                cart.push(product)
            }

            const newPurchaseWithProducts = {
                ...purchase,
                cart
            }
            result.push(newPurchaseWithProducts)    
        
        }
            
        res.status(201).send({ 
            message: "Compra realizada com sucesso" ,
            result
        })

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Get Products by id

app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        const result = await db("products").where({ id })

        if(!result) {
            throw new Error("Produto não existe.")
        }
        res.status(200).send(result)
        console.log("Produto encontrado")

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Get User Purchases by User id

app.get('/users/:id/purchases', async (req: Request, res: Response) => {
    try {
        const buyerId = req.params.id
    
        const result = await db("purchases").where( {buyer_id: buyerId} )

        if(!result) {
            res.status(404)
            throw new Error("Compra do usuário informado não existe.")
        }

        res.status(200).send(result)
        console.log("Array de compras do user informado.")

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

app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete  = req.params.id
        
        const [ userIdAlreadyExists ]: TUser[] | undefined = await db("users").where({ id: idToDelete })

        if(idToDelete[0] !== "u") {
            res.status(400)
            throw new Error("'id' deve começar com a letra 'u'.")            
        }
        
        if(!userIdAlreadyExists) {
            res.status(404)
            throw new Error("'id' não encontrado.")            
        }

        await db("users").del().where({ id: idToDelete })

        res.status(200).send({ message: "User deletado com sucesso." })
       
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})

//Delete Product by id

app.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete  = req.params.id
        
        const [ productIdAlreadyExists ]: TProduct[] | undefined = await db("products").where({ id: idToDelete })

        if(idToDelete[0] !== "u") {
            res.status(400)
            throw new Error("'id' deve começar com a letra 'u'.")            
        }
        
        if(!productIdAlreadyExists) {
            res.status(404)
            throw new Error("'id' não encontrado.")            
        }

        await db("products").del().where({ id: idToDelete })

        res.status(200).send({ message: "Product deletado com sucesso." })
        
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

app.put('/users/:id', async (req: Request, res: Response) => {
    try {

        const idToEdit = req.params.id

        const newId = req.body.id
        const newEmail = req.body.email
        const newPassword = req.body.password        

        if(newId !== undefined) {
            if(newId[0] !== "u") {
                res.status(400)
                throw new Error("'id' deve começar com a letra 'u'.")            
            }
            if(typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
            if(newId.length < 4) {
                res.status(400)
                throw new Error("'id' deve possuir pelo menos 4 caracteres.")
            }
        }
        
        if(newEmail !== undefined) {
            if(typeof newEmail !== "string") {
                res.status(400)
                throw new Error("'email' deve ser string")
            }
            if(newEmail.length < 2) {
                res.status(400)
                throw new Error("'email' deve possuir pelo menos 2 caracteres.")
            }
            if (!newEmail.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
                throw new Error("'email' deve ser de um domínio válido")
            }
        }

        if(newPassword !== undefined) {
            if(typeof newPassword !== "string") {
                res.status(400)
                throw new Error("'password' deve ser string")
            }
            if (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
                throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
            }
        }

        const [ user ]: TUser[] | undefined = await db("users").where({ id: idToEdit })

        if(!user) {
            res.status(404)
            throw new Error("'id' de user não encontrado.")            
        }
        
        const userToEdit: TUser = {
            id: newId || user.id,
            email: newEmail || user.email,
            password: newPassword || user.password
        }
	
        await db("users").update(userToEdit).where({ id: idToEdit })

        res.status(201).send({
            message: "User editada com sucesso.",
            user: idToEdit
        })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Edit Product by id

app.put('/products/:id', async (req: Request, res: Response) => {
    try {

        const idToEdit = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newCategory = req.body.category
        const newDescription = req.body.description
        const newImageUrl = req.body.imageUrl        

        if(newId !== undefined) {
            if(newId[0] !== "u") {
                res.status(400)
                throw new Error("'id' deve começar com a letra 'u'.")            
            }
            if(typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
            if(newId.length < 4) {
                res.status(400)
                throw new Error("'id' deve possuir pelo menos 4 caracteres.")
            }
        }
        
        if(newName !== undefined) {
            if(typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
            }
            if(newName.length < 2) {
                res.status(400)
                throw new Error("'name' deve possuir pelo menos 2 caracteres.")
            }
        }

        if(newPrice !== undefined) {
            if(typeof newPrice !== "number") {
                res.status(400)
                throw new Error("'price' deve ser number")
            }
        }

        if(newCategory !== undefined) {
            if(typeof newCategory !== "string") {
                res.status(400)
                throw new Error("'category' deve ser string")
            }
            if(newCategory.length < 3) {
                res.status(400)
                throw new Error("'category' deve possuir pelo menos 3 caracteres.")
            }
        }

        if(newDescription !== undefined) {
            if(typeof newDescription !== "string") {
                res.status(400)
                throw new Error("'description' deve ser string")
            }
            if(newDescription.length < 3) {
                res.status(400)
                throw new Error("'description' deve possuir pelo menos 3 caracteres.")
            }
        }

        if(newImageUrl !== undefined) {
            if(typeof newImageUrl !== "string") {
                res.status(400)
                throw new Error("'imageUrl' deve ser string")
            }
            if(newImageUrl.length < 5) {
                res.status(400)
                throw new Error("'imageUrl' deve possuir pelo menos 5 caracteres.")
            }
        }        

        const [ product ]: TProduct[] | undefined = await db("products").where({ id: idToEdit })

        if(!product) {
            res.status(404)
            throw new Error("'id' de product não encontrado.")            
        }
        
        const productToEdit: TProduct = {
            id: newId || product.id,
            name: newName || product.name,
            price: newPrice || product.price,
            category: newCategory || product.category,
            description: newDescription || product.description,
            image_url: newImageUrl || product.image_url
        }
	
        await db("products").update(productToEdit).where({ id: idToEdit })

        res.status(200).send({
            message: "Product editado com sucesso.",
            product: idToEdit
        })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Exercício 2 - Aprofundamento Knex

//Get Purchase by id
 
app.get('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        if(id.length < 5) {
            res.status(400)
            throw new Error("'id' deve possuir pelo menos 5 caracteres.");
        }

        const [ purchase ]: TPurchase[] = await db("purchases").where({ id: id })

        if(purchase){
            
            const [ cart ] = await db("purchases")
            .select(
                "purchases.id AS purchaseId",
                "purchases.total_price AS totalPrice",
                "purchases.created_at AS createdAt",
                "purchases.paid AS isPaid",
                "users.id AS buyerId",
                "users.email",
                "users.name"
            )
            .innerJoin("users", "purchases.buyer_id", "=", "users.id")

            const purchaseProducts = await db("purchases_products")
            .select(
                "purchases_products.product_id AS id",
                "products.name",
                "products.price",
                "products.description",
                "products.image_url AS urlImage",
                "purchases_products.quantity"
            )
            .innerJoin("products","products.id","=","purchases_products.product_id")

            const result = { 
                ...cart, 
                productsList: purchaseProducts 
            }
            
            console.log(result)
            res.status(200).send(result)

        }else{
            res.status(404)
            throw new Error("Compra não existe no banco de dados.")            
        }       

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})