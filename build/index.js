"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const types_1 = require("./types");
const database_2 = require("./database");
(0, database_2.createUser)("u003", "beltrano@email.com", "beltrano99");
console.table((0, database_2.getAllUsers)());
(0, database_2.createProduct)("p003", "Picanha", 60, types_1.CATEGORIES.MEAT);
console.table((0, database_2.getAllProducts)());
console.log((0, database_2.getProductById)("p001"));
(0, database_2.createPurchase)("u003", "p003", 3, 180);
console.log((0, database_2.getAllPurchasesFromUserId)("u003"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.get('/users', (req, res) => {
    res.status(200).send(database_1.users);
});
app.get('/products', (req, res) => {
    res.status(200).send(database_1.products);
});
app.get('products/search', (req, res) => {
    const q = req.query.q;
    const result = database_1.products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase());
    });
    res.status(200).send(result);
});
app.post('/users', (req, res) => {
    const { id, email, password } = req.body;
    const newUser = {
        id,
        email,
        password
    };
    database_1.users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso");
});
app.post('/prodcuts', (req, res) => {
    const { id, name, price, category } = req.body;
    const newProduct = {
        id,
        name,
        price,
        category
    };
    database_1.products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso");
});
app.post('/purchase', (req, res) => {
    const { userId, productId, quantity, totalPrice } = req.body;
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    database_1.purchases.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso");
});
//# sourceMappingURL=index.js.map